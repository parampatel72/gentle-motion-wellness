
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressRingProps {
  size?: number;
  progress: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing = ({
  size = 120,
  progress = 0,
  strokeWidth = 8,
  color = "#8ECFD7",
  bgColor = "#E5E7EB",
  label,
  className,
  children,
}: ProgressRingProps) => {
  const [offset, setOffset] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const progressOffset = circumference - (progress / 100) * circumference;
    setOffset(progressOffset);
  }, [setOffset, circumference, progress]);

  return (
    <div className={cn("relative inline-flex flex-col items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="transition-all duration-500"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-500 ease-in-out"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        {children || (
          <>
            <span className="text-2xl font-bold">{progress}%</span>
            {label && <span className="text-sm text-muted-foreground mt-1">{label}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
