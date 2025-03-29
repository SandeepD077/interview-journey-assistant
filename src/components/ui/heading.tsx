
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  description?: string;
  descriptionClassName?: string;
  centered?: boolean;
  className?: string;
}

export function Heading({
  title,
  description,
  className,
  descriptionClassName,
  centered = false,
  ...props
}: HeadingProps) {
  return (
    <div
      className={cn(
        "mb-6", 
        centered && "text-center",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-2 text-muted-foreground",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
