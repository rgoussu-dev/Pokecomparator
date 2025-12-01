import { Meta, StoryObj } from '@storybook/angular';
import { Label } from '../lib/atoms/label/label';

const meta: Meta<Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  render: (args) => ({
    component: Label,
    props: args,
  }),
};
export default meta;

type Story = StoryObj<Label>;

export const Default: Story = {
  args: {
    text: 'Pokemon Name',
    for: 'pokemon-input',
    required: false,
  },
};

export const Required: Story = {
  args: {
    text: 'Pokemon Name',
    for: 'pokemon-input',
    required: true,
  },
};

export const CustomFor: Story = {
  args: {
    text: 'Search',
    for: 'search-input',
    required: false,
  },
};
