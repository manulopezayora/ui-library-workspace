import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        label: 'Button',
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary'],
        },
        size: {
            control: 'select',
            options: ['small', 'large'],
        },
    },
};

export default meta;

type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    type: 'primary',
    size: 'large',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    type: 'secondary',
    size: 'small',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Tertiary',
    type: 'tertiary',
    size: 'small',
  },
};