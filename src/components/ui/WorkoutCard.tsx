
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkoutCardProps {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  image: string;
  className?: string;
}

const WorkoutCard = ({
  id,
  title,
  category,
  duration,
  difficulty,
  image,
  className,
}: WorkoutCardProps) => {
  const difficultyMap = {
    easy: {
      label: "Easy",
      color: "bg-green-100 text-green-800",
    },
    medium: {
      label: "Moderate",
      color: "bg-blue-100 text-blue-800",
    },
    hard: {
      label: "Challenging",
      color: "bg-orange-100 text-orange-800",
    },
  };

  return (
    <Link
      to={`/workouts/${id}`}
      className={cn(
        "gentle-card block overflow-hidden hover:shadow-gentle transition-all animate-fade-in",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden rounded-xl mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              difficultyMap[difficulty].color
            )}
          >
            {difficultyMap[difficulty].label}
          </span>
        </div>
      </div>
      <div className="p-2">
        <span className="text-xs uppercase font-medium text-primary">
          {category}
        </span>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex items-center text-muted-foreground">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
