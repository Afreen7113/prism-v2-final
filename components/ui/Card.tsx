import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'rounded-lg border border-border-subtle bg-bg-surface text-text-brand shadow-sm',
            className
          )
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

