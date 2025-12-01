import { Meta, StoryObj } from '@storybook/angular';
import { ThemeToggle } from '../lib/molecule/theme-toggle/theme-toggle';

const meta: Meta<ThemeToggle> = {
  title: 'Molecule/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  render: (args) => ({
    component: ThemeToggle,
    props: args,
  }),
};
export default meta;

type Story = StoryObj<ThemeToggle>;

export const LightMode: Story = {
  args: {
    isDark: false,
  },
};

export const DarkMode: Story = {
  args: {
    isDark: true,
  },
};
