import type { Meta, StoryObj } from '@storybook/react';
import { ChartWidget } from '../components/ui/ChartWidget';

const meta: Meta<typeof ChartWidget> = {
  title: 'UI/ChartWidget',
  component: ChartWidget,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartWidget>;

export const Default: Story = {
  args: {
    title: 'Monthly Analytics',
    height: 300,
  },
};
