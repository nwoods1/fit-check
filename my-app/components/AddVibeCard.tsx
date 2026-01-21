"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type CustomVibe = {
  id: string;
  name: string;
  description: string;
  rubric: {
    signature_items: string[];
    avoid: string[];
    palette_materials: string[];
    silhouette: string[];
  };
};

interface AddVibeCardProps {
  index: number;
  onVibeCreated?: (vibe: CustomVibe) => void;
}

export function AddVibeCard({ index, onVibeCreated }: AddVibeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [vibeName, setVibeName] = useState("");
  const [vibeDescription, setVibeDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!vibeName.trim() || !vibeDescription.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-rubric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ styleDescription: vibeDescription }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.rubric) {
        const styleId = `custom-${vibeName.toLowerCase().replace(/\s+/g, "-")}`;

        // Save to Supabase
        const saveRes = await fetch("/api/custom-vibes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: styleId,
            name: vibeName,
            description: vibeDescription,
            rubric: data.rubric,
          }),
        });
        const saveData = await saveRes.json();

        if (saveData.error) {
          setError(saveData.error);
          return;
        }

        // Create custom vibe object for UI
        const newVibe: CustomVibe = {
          id: styleId,
          name: vibeName,
          description: vibeDescription,
          rubric: data.rubric,
        };

        // Notify parent component
        onVibeCreated?.(newVibe);

        setIsOpen(false);
        setVibeName("");
        setVibeDescription("");
      }
    } catch (err: any) {
      console.error("Failed to generate rubric:", err);
      setError("Failed to generate style. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.985 }}
          className="cursor-pointer select-none"
        >
          <div className="rounded-[22px] border-2 border-dashed border-zinc-900/50 bg-[#f7f1ea] p-4 shadow-[4px_4px_0_#00000012] hover:shadow-[6px_6px_0_#00000014] transition">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-black tracking-wide uppercase">
                Add a Vibe
              </h3>
              <div className="h-px w-10 bg-zinc-900/30" />
              <p className="text-xs text-zinc-700 [font-family:ui-serif,Georgia,serif]">
                Create a custom style target
              </p>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-[#f4eadf] border-2 border-zinc-900 shadow-[6px_6px_0_#00000015]">
        <DialogHeader>
          <DialogTitle className="font-black tracking-wide">
            Create a Vibe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div>
            <label className="text-xs font-medium text-zinc-700 mb-1 block">
              Vibe Name
            </label>
            <Input
              placeholder="e.g. Business Professor"
              value={vibeName}
              onChange={(e) => setVibeName(e.target.value)}
              className="border-zinc-900 bg-[#faf7f3]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700 mb-1 block">
              Describe the vibe
            </label>
            <textarea
              placeholder="e.g. A university professor in the business faculty who looks approachable but professional, with smart casual pieces..."
              value={vibeDescription}
              onChange={(e) => setVibeDescription(e.target.value)}
              className="w-full p-3 border-2 border-zinc-900 rounded-md bg-[#faf7f3] text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!vibeName.trim() || !vibeDescription.trim() || isGenerating}
            className="w-full border-2 border-zinc-900 bg-[#e7dccf] text-zinc-900 hover:bg-[#dfd2c4] disabled:opacity-50"
          >
            {isGenerating ? "Generating style..." : "Create Vibe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
