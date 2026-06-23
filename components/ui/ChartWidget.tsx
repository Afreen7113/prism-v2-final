import React from 'react';
import { Card } from './Card';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ChartWidgetProps {
  title: string;
  className?: string;
  height?: number;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ title, className, height = 300 }) => {
  return (
    <Card className={twMerge(clsx('p-6 flex flex-col', className))}>
      <h3 className="text-lg font-medium text-text-brand mb-4">{title}</h3>
      <div 
        className="flex-1 bg-bg-subtle rounded-md flex items-center justify-center text-text-secondary border border-border-subtle border-dashed"
        style={{ minHeight: height }}
      >
        Chart Placeholder
      </div>
    </Card>
  );
};
