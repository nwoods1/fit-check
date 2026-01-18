"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/StepIndicator";
import { styleCategories } from "@/data/styles";
import { sampleFits } from "@/data/fits";

function FittingRoomContent() {
  const router = useRouter();
  const params = useParams();
  const styleId = params?.styleId as string;
  const [savedFits, setSavedFits] = useState<string[]>([]);

  const style = styleCategories.find((s) => s.id === styleId);

  // Get suggested fits
  const suggestedFits = sampleFits.filter(
    (fit) => fit.style === styleId || !styleId.startsWith("custom-")
  ).slice(0, 3);

  const toggleSaveFit = (fitId: string) => {
    setSavedFits((prev) =>
      prev.includes(fitId)
        ? prev.filter((id) => id !== fitId)
        : [...prev, fitId]
    );
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
            onClick={() => router.push(`/suggestions/${styleId}`)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Fitting Room
              </h1>
              <p className="text-xs text-muted-foreground">
                Your personalized fits
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Step Indicator */}
      <StepIndicator currentStep={6} />

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto space-y-6"
        >
          {/* Summary */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Your {style?.name || "Custom"} Fits
            </h2>
            <p className="text-muted-foreground">
              We've curated these fits based on your preferences. Save your
              favorites!
            </p>
          </div>

          {/* Saved Counter */}
          {savedFits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/10 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="font-medium text-foreground">
                  {savedFits.length} fit{savedFits.length > 1 ? "s" : ""} saved
                </span>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full">
                View All
              </Button>
            </motion.div>
          )}

          {/* Fit Cards */}
          <div className="space-y-4">
            {suggestedFits.map((fit, index) => (
              <motion.div
                key={fit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="flex">
                  <div className="w-24 h-24 bg-muted flex-shrink-0">
                    <img
                      src={fit.image || "/placeholder-fit.jpg"}
                      alt={fit.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {fit.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {fit.items.length} items
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {fit.items.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                        >
                          {item.type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => toggleSaveFit(fit.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          savedFits.includes(fit.id)
                            ? "text-red-500 fill-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => router.push(`/suggestions/${styleId}`)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => router.push("/")}
            >
              <Check className="w-5 h-5 mr-2" />
              Done
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FittingRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <FittingRoomContent />
    </Suspense>
  );
}
