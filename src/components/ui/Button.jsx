import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable Minimalist Architectural Button Component
 * Follows design direction: Simple, non-pill shape, thin borders, clear typography
 */

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  icon = true,
  onClick,
  href,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-architectural cursor-pointer select-none tracking-tight rounded-[4px]";

  const variantStyles = {
    primary: "bg-[#111111] text-[#F7F7F5] border border-[#111111] hover:bg-[#D85B3F] hover:border-[#D85B3F]",
    secondary: "bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F7F7F5]",
    outline: "bg-transparent text-[#111111] border border-[#D9D9D4] hover:border-[#111111]",
    ghost: "bg-transparent text-[#111111] hover:bg-[#EEEEEB]",
    accent: "bg-[#D85B3F] text-[#F7F7F5] border border-[#D85B3F] hover:bg-[#111111] hover:border-[#111111]"
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 uppercase tracking-wider",
    md: "text-sm px-6 py-3 gap-2.5",
    lg: "text-base px-8 py-4 gap-3 font-semibold"
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={`group ${combinedClasses}`} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
