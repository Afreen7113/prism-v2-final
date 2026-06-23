import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSelector } from '../components/ui/ThemeSelector';
import { useState } from 'react';

const meta: Meta<typeof ThemeSelector> = {
  title: 'UI/ThemeSelector',
  component: ThemeSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeSelector>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    return <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />;
  },
};
