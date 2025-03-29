
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "light" | "primary" | "dark";
  fullWidth?: boolean;
}

export function SectionContainer({
  children,
  className,
  id,
  background = "default",
  fullWidth = false,
}: SectionContainerProps) {
  const backgroundClasses = {
    default: "bg-background",
    light: "bg-gray-50",
    primary: "bg-primary/10",
    dark: "bg-gray-900 text-white",
  };

  return (
    <section
      id={id}
      className={cn("py-12 md:py-16", backgroundClasses[background], className)}
    >
      <div className={cn(!fullWidth && "container px-4 mx-auto")}>
        {children}
      </div>
    </section>
  );
}
