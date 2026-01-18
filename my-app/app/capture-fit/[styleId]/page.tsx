"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Camera, ArrowLeft, ArrowRight, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/StepIndicator";
import { styleCategories } from "@/data/styles";

function CaptureFitContent() {
  const router = useRouter();
  const params = useParams();
  const styleId = params?.styleId as string;
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const style = styleCategories.find((s) => s.id === styleId);

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
      <StepIndicator currentStep={3} />

      {/* Content */}
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
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-primary">
                <img
                  src={uploadedImage}
                  alt="Uploaded fit"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-12 h-12 text-primary" />
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Upload Your Fit
            </h2>
            <p className="text-muted-foreground">
              Upload an image of the style or outfit you're looking for. We'll
              use this to find similar fits that match your vibe.
            </p>
          </div>

          {/* Upload Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Upload from gallery */}
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="bg-card border border-border rounded-2xl p-6 cursor-pointer hover:bg-muted transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      Upload from Gallery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Choose an inspiration image from your photos
                    </p>
                  </div>
                </div>
              </div>
            </label>

            {/* Take a photo */}
            <div
              onClick={() => router.push(`/camera/${styleId}`)}
              className="bg-card border border-border rounded-2xl p-6 cursor-pointer hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Take a Photo</p>
                  <p className="text-sm text-muted-foreground">
                    Capture your current outfit with the camera
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => router.push(`/body-type?style=${styleId}`)}
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
      </div>
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
