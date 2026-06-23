import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          {
            'bg-brand text-text-on-primary hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:-translate-y-0.5 border border-transparent': variant === 'primary',
            'bg-bg-elevated text-text-primary border border-border-subtle hover-semantic-button': variant === 'secondary',
            'bg-transparent text-text-primary border border-border-subtle hover-semantic-surface': variant === 'outline',
            'bg-transparent text-text-secondary border border-transparent hover-semantic-button': variant === 'ghost',
          },
          // Sizes
          {
            'h-9 px-4 text-xs min-h-[36px]': size === 'sm',
            'h-11 px-5 py-2 text-sm min-h-[44px]': size === 'md',
            'h-12 px-6 py-3 text-base min-h-[48px]': size === 'lg',
            'h-11 w-11 p-2 min-h-[44px]': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
