
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false,
  className
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-8 md:mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl font-bold mb-3 bg-gold-gradient text-transparent bg-clip-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
