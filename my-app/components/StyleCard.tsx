"use client";

import { motion } from "framer-motion";
import { StyleCategory } from "@/data/styles";
import { useRouter } from "next/navigation";

interface StyleCardProps {
  style: StyleCategory;
  index: number;
}

export function StyleCard({ style, index }: StyleCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/camera/${style.id}`)}
      className="style-card group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-background/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <span className="text-2xl">{style.emoji}</span>
        </div>

        <div>
          <h3 className="font-display font-semibold text-foreground/90 text-sm">
            {style.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {style.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
