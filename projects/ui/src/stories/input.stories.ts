import { Meta, StoryObj } from '@storybook/angular';
import { InputAtom } from '../lib/atoms/input/input';

const meta: Meta<InputAtom> = {
  title: 'Atoms/Input',
  component: InputAtom,
  tags: ['autodocs'],
  render: (args) => ({
    component: InputAtom,
    props: args,
  }),
};
export default meta;

type Story = StoryObj<InputAtom>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search...',
    ariaLabel: 'Search input',
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    placeholder: 'Disabled input',
    disabled: true,
    ariaLabel: 'Disabled input',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Pikachu',
    placeholder: 'Type a Pokemon',
    ariaLabel: 'Pokemon input',
  },
};

export const Password: Story = {
  args: {
    value: '',
    placeholder: 'Password',
    type: 'password',
    ariaLabel: 'Password input',
  },
};
