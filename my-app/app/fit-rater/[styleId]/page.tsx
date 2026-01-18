"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { Star, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/StepIndicator";
import { styleCategories } from "@/data/styles";

function FitRaterContent() {
  const router = useRouter();
  const params = useParams();
  const styleId = params?.styleId as string;

  const style = styleCategories.find((s) => s.id === styleId);

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
            onClick={() => router.push(`/capture-fit/${styleId}`)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Fit Rater
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

      {/* Empty Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Star className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-xs">
            Rate fits to personalize your suggestions
          </p>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 pb-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full"
          onClick={() => router.push(`/capture-fit/${styleId}`)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <Button
          size="lg"
          className="rounded-full"
          onClick={() => router.push(`/suggestions/${styleId}`)}
        >
          Next
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default function FitRaterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <FitRaterContent />
    </Suspense>
  );
}
