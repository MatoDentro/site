interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ className = "", size = "md", withText = false }: LogoProps) {
  const sizeClasses = {
    sm: "h-16",
    md: "h-24",
    lg: "h-32",
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="/images/logomato.jpg" 
        alt="Logo Mato Dentro Sustentável" 
        className={`${sizeClasses[size]} object-contain mix-blend-multiply`} 
      />
      {withText && (
        <span className="font-heading font-bold text-xl md:text-2xl">
          Mato Dentro Sustentável
        </span>
      )}
    </div>
  );
}
