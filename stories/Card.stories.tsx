import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/ui/Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <div className="p-6">Card Content Here</div>,
  },
};
