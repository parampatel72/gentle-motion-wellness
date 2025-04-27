
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Volume, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface VoiceGuidanceProps {
  instructions: string[];
  onInstructionComplete?: () => void;
}

const VoiceGuidance = ({ instructions, onInstructionComplete }: VoiceGuidanceProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playInstruction = (index: number) => {
    if (index >= instructions.length) {
      setIsPlaying(false);
      if (onInstructionComplete) onInstructionComplete();
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(instructions[index]);
    utteranceRef.current.onend = () => {
      setTimeout(() => playInstruction(index + 1), 2000);
    };
    synth.speak(utteranceRef.current);
    setCurrentIndex(index);
  };

  const startVoiceGuidance = () => {
    setIsPlaying(true);
    playInstruction(0);
    toast.success("Voice guidance started");
  };

  const stopVoiceGuidance = () => {
    setIsPlaying(false);
    synth.cancel();
    toast.info("Voice guidance stopped");
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isPlaying ? "destructive" : "outline"}
        size="icon"
        onClick={isPlaying ? stopVoiceGuidance : startVoiceGuidance}
        title={isPlaying ? "Stop voice guidance" : "Start voice guidance"}
      >
        {isPlaying ? <VolumeX size={18} /> : <Volume size={18} />}
      </Button>
      {isPlaying && (
        <span className="text-sm text-muted-foreground">
          Step {currentIndex + 1} of {instructions.length}
        </span>
      )}
    </div>
  );
};

export default VoiceGuidance;
