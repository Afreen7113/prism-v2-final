import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ThemeSelectorProps {
  currentTheme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  currentTheme = 'dark', 
  onThemeChange, 
  className 
}) => {
  return (
    <div className={twMerge(clsx('flex items-center gap-2 p-1 rounded-full border border-border-subtle bg-bg-surface', className))}>
      <button
        onClick={() => onThemeChange?.('light')}
        className={clsx(
          'px-3 py-1 text-sm font-medium rounded-full transition-colors',
          currentTheme === 'light' 
            ? 'bg-brand text-text-inverse' 
            : 'text-text-secondary hover:text-text-brand hover:bg-bg-subtle'
        )}
      >
        Light
      </button>
      <button
        onClick={() => onThemeChange?.('dark')}
        className={clsx(
          'px-3 py-1 text-sm font-medium rounded-full transition-colors',
          currentTheme === 'dark' 
            ? 'bg-brand text-text-inverse' 
            : 'text-text-secondary hover:text-text-brand hover:bg-bg-subtle'
        )}
      >
        Dark
      </button>
    </div>
  );
};
