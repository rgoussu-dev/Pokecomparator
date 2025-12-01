import { Meta, StoryObj } from '@storybook/angular';
import { Searchbar} from '../lib/molecule/searchbar/searchbar';

const meta: Meta<Searchbar> = {
  title: 'Molecule/Searchbar',
  component: Searchbar,
  tags: ['autodocs'],
  render: (args) => ({
    component: Searchbar,
    props: args,
  }),
};
export default meta;

type Story = StoryObj<Searchbar>;

export const Default: Story = {
  args: {
    value: '',
    buttonIcon: 'search-pokeball',
    placeholder: 'Search for a Pokemon...',
    label: 'Pokemon',
    required: false,
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Bulbasaur',
    buttonIcon: 'search-pokeball',
    placeholder: 'Search for a Pokemon...',
    label: 'Pokemon',
    required: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    buttonIcon: 'search-pokeball',
    placeholder: 'Search for a Pokemon...',
    label: 'Pokemon',
    required: false,
    disabled: true,
  },
};
