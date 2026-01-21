"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { CustomVibe } from "./AddVibeCard";

interface CustomVibeCardProps {
  vibe: CustomVibe;
  index: number;
  onDelete?: (vibeId: string) => void;
}

export function CustomVibeCard({ vibe, index, onDelete }: CustomVibeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to camera - rubric will be fetched from Supabase
    router.push(`/camera/${vibe.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(vibe.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      onClick={handleClick}
      className={[
        "cursor-pointer select-none relative group",
        "rounded-[22px] border-2 border-zinc-900 p-4",
        "shadow-[4px_4px_0_#00000014] hover:shadow-[6px_6px_0_#00000016]",
        "transition-all duration-150",
        "bg-[#d4e4d9]", // Custom vibe color - soft green
      ].join(" ")}
    >
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 h-6 w-6 rounded-full border border-zinc-900/50 bg-[#f4eadf] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-[#eee2d5]"
      >
        <X className="w-3 h-3" />
      </button>

      <div className="flex flex-col gap-2">
        {/* Label / Title */}
        <h3 className="text-sm font-black tracking-wide uppercase pr-6">
          {vibe.name}
        </h3>

        {/* Divider */}
        <div className="h-px w-10 bg-zinc-900/40" />

        {/* Description */}
        <p className="text-xs leading-relaxed text-zinc-700 [font-family:ui-serif,Georgia,serif] line-clamp-3">
          {vibe.description}
        </p>
      </div>
    </motion.div>
  );
}
