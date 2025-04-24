
import { cn } from "@/lib/utils";

interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon: React.ReactNode;
  color?: "teal" | "lavender" | "peach" | "blue";
}

const ActivityCard = ({
  title,
  description,
  icon,
  color = "teal",
  className,
  ...props
}: ActivityCardProps) => {
  const colorMap = {
    teal: {
      bg: "bg-gentle-teal-light",
      iconBg: "bg-gentle-teal",
    },
    lavender: {
      bg: "bg-gentle-lavender-light",
      iconBg: "bg-gentle-lavender",
    },
    peach: {
      bg: "bg-gentle-peach-light",
      iconBg: "bg-gentle-peach",
    },
    blue: {
      bg: "bg-gentle-blue-light",
      iconBg: "bg-gentle-blue",
    },
  };

  return (
    <div
      className={cn(
        "gentle-card flex items-start gap-4 transition-all hover:shadow-gentle animate-fade-in",
        colorMap[color].bg,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-xl p-3 flex-shrink-0",
          colorMap[color].iconBg
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
};

export default ActivityCard;
