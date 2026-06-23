import React from 'react';
import { Card } from './Card';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, className }) => {
  return (
    <Card className={twMerge(clsx('p-6', className))}>
      <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-text-brand">{value}</p>
        {change && (
          <span
            className={twMerge(
              clsx(
                'text-sm font-medium',
                isPositive ? 'text-status-success' : 'text-status-error'
              )
            )}
          >
            {isPositive ? '+' : ''}{change}
          </span>
        )}
      </div>
    </Card>
  );
};
