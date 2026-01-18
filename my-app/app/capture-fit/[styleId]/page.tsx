"use client";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { 
  Camera, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Loader2,
  X,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/StepIndicator";
import { styleCategories } from "@/data/styles";

function CaptureFitContent() {
  const router = useRouter();
  const params = useParams();
  const styleId = params?.styleId as string;
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const style = styleCategories.find((s) => s.id === styleId);

  // --- HANDLERS ---

  // 1. Handle File Upload
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

  // 2. Start Webcam
  const startCamera = async () => {
    setCameraError(null);
    try {
      setIsCameraActive(true);
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
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setUploadedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4 pb-2"
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/body-type?style=${styleId}`)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Capture Your Fit
              </h1>
              <p className="text-xs text-muted-foreground">
                {style?.name || "Custom"} style
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Step Indicator */}
      <StepIndicator currentStep={2} />

      {!isCameraActive && (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Icon or Preview */}
          <div className="flex justify-center">
            {uploadedImage ? (
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-primary bg-black">
                <img
                  src={uploadedImage}
                  alt="Uploaded fit"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1"><CheckCircle2 className="w-5 h-5"/></div>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary" />
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {uploadedImage ? "Ready to go!" : "Capture Your Fit"}
            </h2>
            <p className="text-muted-foreground">
              {uploadedImage 
                ? "We'll analyze this image to find your perfect fit"
                : "Use your camera or upload an image of your outfit or style inspiration"}
            </p>
          </div>

          {/* Upload Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />

            {!uploadedImage && (
              <>
                <div onClick={() => fileInputRef.current?.click()} className="bg-card border p-4 rounded-2xl cursor-pointer hover:bg-muted flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Upload className="w-5 h-5 text-primary"/></div>
                  <div><p className="font-medium">Upload from Gallery</p><p className="text-xs text-muted-foreground">Choose an image from your photos</p></div>
                </div>

                <div onClick={startCamera} className="bg-card border p-4 rounded-2xl cursor-pointer hover:bg-muted flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Camera className="w-5 h-5 text-primary"/></div>
                  <div><p className="font-medium">Take a Photo</p><p className="text-xs text-muted-foreground">Use your camera to capture your fit</p></div>
                </div>
              </>
            )}

            {cameraError && <p className="text-red-500 text-center text-sm">{cameraError}</p>}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button
                size="lg"
                className="rounded-full"
                disabled={!uploadedImage}
                onClick={() => router.push(`/fit-rater/${styleId}`)}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      )}

      {/* CAMERA VIEW */}
      {isCameraActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover md:object-contain"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Body Type Overlay Guide */}
          <img 
            src="/s3.png" 
            alt="Body positioning guide" 
            className="absolute inset-0 w-full h-full object-cover md:object-contain pointer-events-none opacity-70"
          />

          <div className="absolute bottom-10 flex items-center gap-8 z-10">
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
    </div>
  );
}

export default function CaptureFitPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <CaptureFitContent />
    </Suspense>
  );
}
