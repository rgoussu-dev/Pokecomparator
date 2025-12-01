import type { Meta, StoryObj } from '@storybook/angular';

import { Button } from '../lib/atoms/button/button';

const meta: Meta<Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', disabled: false, fullWidth: false, type: 'button' },
  render: (args) => ({
    props: args,
    template: `<pc-button [variant]="variant" [size]="size" [disabled]="disabled">Primary</pc-button>`,
  }),
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<pc-button [variant]="variant" [size]="size">Secondary</pc-button>`,
  }),
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<pc-button [variant]="variant" [size]="size">Ghost</pc-button>`,
  }),
};

export const FullWidth: Story = {
  args: { variant: 'primary', size: 'md', fullWidth: true },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px"><pc-button [variant]="variant" [size]="size" [fullWidth]="fullWidth">Full width</pc-button></div>`,
  }),
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
  render: (args) => ({
    props: args,
    template: `<pc-button [variant]="variant" [disabled]="disabled">Disabled</pc-button>`,
  }),
};

export const Sizes: Story = {
  args: {},
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <pc-button size="sm">Small</pc-button>
        <pc-button size="md">Medium</pc-button>
        <pc-button size="lg">Large</pc-button>
      </div>
    `,
  }),
};
