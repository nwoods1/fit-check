"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/StepIndicator";
import { FitCard } from "@/components/FitCard";
import { FitFilterChat } from "@/components/FitFilterChat";
import { sampleFits } from "@/data/fits";
import { styleCategories } from "@/data/styles";

export default function BodyPicturePage() {
  const router = useRouter();
  const params = useParams();
  const styleId = params?.styleId as string;
  const [filterQuery, setFilterQuery] = useState("");

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
            onClick={() => router.push(`/camera/${styleId}`)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shirt className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Suggested Fits
              </h1>
              <p className="text-xs text-muted-foreground">
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Step Indicator */}
      <StepIndicator currentStep={4} />
    </div>
  );
};