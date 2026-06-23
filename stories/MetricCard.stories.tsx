import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from '../components/ui/MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'UI/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '20.1% from last month',
    isPositive: true,
  },
};

export const Negative: Story = {
  args: {
    title: 'Active Users',
    value: '+2350',
    change: '5.1% from last month',
    isPositive: false,
  },
};
