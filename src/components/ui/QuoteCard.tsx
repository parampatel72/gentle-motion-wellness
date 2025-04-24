
import { cn } from "@/lib/utils";

interface QuoteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
}

const QuoteCard = ({ quote, author, className, ...props }: QuoteCardProps) => {
  return (
    <div
      className={cn(
        "gentle-card bg-gentle-lavender-light p-6 text-center animate-fade-in",
        className
      )}
      {...props}
    >
      <p className="text-lg italic mb-4 relative">
        <span className="text-4xl opacity-40 absolute -top-3 -left-1">"</span>
        {quote}
        <span className="text-4xl opacity-40 absolute -bottom-8 -right-1">"</span>
      </p>
      <p className="font-medium text-muted-foreground">{author}</p>
    </div>
  );
};

export default QuoteCard;
