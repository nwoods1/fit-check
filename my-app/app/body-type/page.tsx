// "use client";

// import { useState, Suspense } from "react";
// import { motion } from "framer-motion";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Shirt, ArrowLeft, ArrowRight, ScanLine, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { StepIndicator } from "@/components/StepIndicator";

// function BodyTypeContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const styleId = searchParams.get("style") || "casual";
//   const [confirmed, setConfirmed] = useState(false);

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       {/* Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="px-4 pt-4 pb-2"
//       >
//         <div className="flex items-center gap-3">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => router.push("/")}
//             className="rounded-full"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//               <ScanLine className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="font-display text-xl font-bold text-foreground">
//                 Body Type Scan
//               </h1>
//               <p className="text-xs text-muted-foreground">
//                 Help us understand your shape
//               </p>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Step Indicator */}
//       <StepIndicator currentStep={2} />

//       {/* Content */}
//       <div className="flex-1 flex flex-col items-center justify-center px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="max-w-md w-full space-y-8"
//         >
//           {/* Icon */}
//           <div className="flex justify-center">
//             <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
//               <Shirt className="w-12 h-12 text-primary" />
//             </div>
//           </div>

//           {/* Instructions */}
//           <div className="text-center space-y-2">
//             <h2 className="text-2xl font-display font-bold text-foreground">
//               Before we scan
//             </h2>
//             <p className="text-muted-foreground">
//               For the best results, please wear form-fitting clothing so we can accurately detect your body shape.
//             </p>
//           </div>

//           {/* Checkbox */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="bg-card border border-border rounded-2xl p-6"
//           >
//             <label className="flex items-start gap-4 cursor-pointer">
//               <Checkbox
//                 checked={confirmed}
//                 onCheckedChange={(checked) => setConfirmed(checked === true)}
//                 className="mt-1"
//               />
//               <div className="space-y-1">
//                 <p className="font-medium text-foreground">
//                   I'm wearing fitted clothing
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Avoid baggy or loose clothing for accurate body shape detection
//                 </p>
//               </div>
//             </label>
//           </motion.div>

          
//           {/* Navigation Buttons */}
//           <div className="flex items-center justify-between">
//             <Button
//               variant="outline"
//               size="lg"
//               className="rounded-full"
//               onClick={() => router.push("/")}
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back
//             </Button>
//             <Button
//               size="lg"
//               className="rounded-full"
//               disabled={!confirmed}
//               onClick={() => router.push(`/capture-fit/${styleId}`)}
//             >
//               Continue
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default function BodyTypePage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
//       </div>
//     }>
//       <BodyTypeContent />
//     </Suspense>
//   );
// }

"use client";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Shirt, 
  ArrowLeft, 
  ArrowRight, 
  ScanLine, 
  Camera, 
  Upload, 
  Loader2,
  X,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StepIndicator } from "@/components/StepIndicator";

function BodyTypeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const styleId = searchParams.get("style") || "casual";

  // --- STATE ---
  const [step, setStep] = useState<"instructions" | "capture">("instructions");
  const [confirmed, setConfirmed] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // --- REFS ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- HANDLERS ---

  // 1. Handle File Upload (The "Upload" button)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Start Desktop Webcam (The "Take Photo" button)
  const startCamera = async () => {
    setCameraError(null);
    try {
      setIsCameraActive(true);
      // Wait for the video element to render
      setTimeout(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setIsCameraActive(false);
      setCameraError("Camera access denied or not available.");
    }
  };

  // 3. Stop Webcam
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  // 4. Snap Picture
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Match canvas size to video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw image
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setUploadedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleNext = () => {
    router.push(`/fit-rater/${styleId}`); 
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header className="px-4 pt-4 pb-2 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (isCameraActive) stopCamera();
              else if (step === "capture") setStep("instructions");
              else router.push("/");
            }}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                {isCameraActive ? "Camera" : "Body Scan"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {step === "instructions" ? "Step 2 of 4" : "Capture your fit"}
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {!isCameraActive && <StepIndicator currentStep={2} />}

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <AnimatePresence mode="wait">
          
          {/* --- VIEW 1: INSTRUCTIONS --- */}
          {step === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md w-full space-y-8"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shirt className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-display font-bold">Before we scan</h2>
                <p className="text-muted-foreground">Please wear form-fitting clothing.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <label className="flex items-start gap-4 cursor-pointer">
                  <Checkbox checked={confirmed} onCheckedChange={(c) => setConfirmed(c === true)} className="mt-1" />
                  <div>
                    <p className="font-medium">I'm wearing fitted clothing</p>
                  </div>
                </label>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" className="rounded-full" onClick={() => router.push("/")}>Back</Button>
                <Button className="rounded-full" disabled={!confirmed} onClick={() => setStep("capture")}>
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* --- VIEW 2: SELECTION (Upload vs Camera) --- */}
          {step === "capture" && !isCameraActive && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-md w-full space-y-6"
            >
              {/* Preview Image if exists */}
              <div className="flex justify-center">
                {uploadedImage ? (
                  <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-primary bg-black">
                     <img src={uploadedImage} alt="Preview" className="w-full h-full object-contain" />
                     <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1"><CheckCircle2 className="w-5 h-5"/></div>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-primary" />
                  </div>
                )}
              </div>
              
              {!uploadedImage && <h2 className="text-2xl font-bold text-center">Capture Your Fit</h2>}
              {cameraError && <p className="text-red-500 text-center text-sm">{cameraError}</p>}

              {/* Hidden Standard File Input for "Upload" */}
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />

              <div className="space-y-4">
                {!uploadedImage && (
                  <>
                    <div onClick={() => fileInputRef.current?.click()} className="bg-card border p-4 rounded-2xl cursor-pointer hover:bg-muted flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Upload className="w-5 h-5 text-primary"/></div>
                      <div><p className="font-medium">Upload from Gallery</p></div>
                    </div>

                    <div onClick={startCamera} className="bg-card border p-4 rounded-2xl cursor-pointer hover:bg-muted flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Camera className="w-5 h-5 text-primary"/></div>
                      <div><p className="font-medium">Take a Photo</p><p className="text-xs text-muted-foreground">Use Webcam</p></div>
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" className="rounded-full" onClick={() => uploadedImage ? setUploadedImage(null) : setStep("instructions")}>
                    {uploadedImage ? <><RefreshCcw className="w-4 h-4 mr-2"/> Retake</> : "Back"}
                  </Button>
                  <Button className="rounded-full" disabled={!uploadedImage} onClick={handleNext}>
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- VIEW 3: DESKTOP WEBCAM OVERLAY --- */}
          {isCameraActive && (
            <motion.div
              key="webcam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            >
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover md:object-contain" // Contain on desktop to see full frame
              />
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute bottom-10 flex items-center gap-8">
                <Button variant="secondary" size="icon" className="rounded-full w-12 h-12" onClick={stopCamera}>
                  <X className="w-6 h-6" />
                </Button>
                <button onClick={capturePhoto} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white" />
                </button>
                <div className="w-12" />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function BodyTypePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <BodyTypeContent />
    </Suspense>
  );
}