"use client";

import { motion } from "framer-motion";
import { Outfit } from "@/data/fits";
import { Shirt, Eye, Footprints } from "lucide-react";

interface FitCardProps {
  fit: Outfit;
  isActive?: boolean;
}

export function FitCard({ fit, isActive = false }: FitCardProps) {
  const top = fit.items.find((i) => i.type === "top");
  const pants = fit.items.find((i) => i.type === "pants");
  const shoes = fit.items.find((i) => i.type === "shoes");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden bg-card border transition-all duration-300 ${
        isActive ? "border-primary shadow-lg scale-105" : "border-border"
      }`}
    >
      {/* Outfit Image Placeholder */}
      <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-5xl mb-3">👕</div>
          <p className="font-display font-semibold text-foreground">{fit.name}</p>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Shirt className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground truncate">{top?.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground truncate">{pants?.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Footprints className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground truncate">{shoes?.name}</span>
        </div>
      </div>

      {/* Color chips */}
      <div className="px-4 pb-4 flex gap-1 flex-wrap">
        {fit.items
          .filter((item) => item.color !== "none")
          .slice(0, 4)
          .map((item) => (
            <span
              key={item.id}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {item.color}
            </span>
          ))}
      </div>
    </motion.div>
  );
}
