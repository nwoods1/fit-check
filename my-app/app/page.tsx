"use client";

import { motion } from "framer-motion";
import { styleCategories } from "@/data/styles";
import { StyleCard } from "@/components/StyleCard";
import { AddVibeCard } from "@/components/AddVibeCard";
import { StepIndicator } from "@/components/StepIndicator";
import { Shirt, Sparkles } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";



export default function Home() {
  return (
    <RequireAuth>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shirt className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Fit Check
            </h1>
            <p className="text-sm text-muted-foreground">
              AI-powered outfit suggestions
            </p>
          </div>
        </div>
      </motion.header>

      {/* Step Indicator */}
      <StepIndicator currentStep={1} />

      {/* Style Grid */}
      <section className="px-4 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground">
            Choose Your Vibe
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {styleCategories.map((style, index) => (
            <StyleCard key={style.id} style={style} index={index} />
          ))}
          <AddVibeCard index={styleCategories.length} />
        </div>
      </section>
    </div>
    <div>Home</div>
    </RequireAuth>
  );
}
