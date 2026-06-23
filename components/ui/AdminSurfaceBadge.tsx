import React from 'react';
import { twMerge } from 'tailwind-merge';

export function AdminSurfaceBadge({ className }: { className?: string }) {
  return (
    <span 
      className={twMerge(
        "inline-flex items-center justify-center",
        "px-2 py-0.5",
        "rounded border",
        "bg-brand/10 border-brand/20",
        "text-brand text-[10px] font-bold uppercase tracking-wider",
        "transition-all duration-300 hover:bg-brand/15 hover:border-brand/30 hover:shadow-sm",
        "select-none cursor-default",
        className
      )}
    >
      Admin Surface
    </span>
  );
}
