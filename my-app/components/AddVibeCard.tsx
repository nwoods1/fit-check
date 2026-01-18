"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddVibeCardProps {
  index: number;
}

export function AddVibeCard({ index }: AddVibeCardProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [vibeName, setVibeName] = useState("");

  const handleSubmit = () => {
    if (vibeName.trim()) {
      // Navigate with custom vibe name
      router.push(`/capture-fit/custom-${vibeName.toLowerCase().replace(/\s+/g, "-")}`);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative group cursor-pointer"
        >
          <div className="rounded-2xl p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all">
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Add Vibe
              </span>
              <span className="text-xs text-muted-foreground text-center">
                Create custom
              </span>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Create Your Vibe</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Enter vibe name (e.g., 'Cozy Winter')"
            value={vibeName}
            onChange={(e) => setVibeName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button onClick={handleSubmit} className="w-full" disabled={!vibeName.trim()}>
            Continue to Camera
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
