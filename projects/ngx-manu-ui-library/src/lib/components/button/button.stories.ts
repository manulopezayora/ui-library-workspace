import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        actions: { argTypesRegex: '^on.*|^handle.*' },
    },
    args: {
        label: 'Button'
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
        },
        severity: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'success'],
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
        severity: 'primary',
        size: 'small',
        type: 'button'
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        severity: 'secondary',
        size: 'small',
        type: 'button'
    },
};

export const Tertiary: Story = {
    args: {
        label: 'Tertiary',
        severity: 'tertiary',
        size: 'small',
        type: 'button'
    },
};

export const Danger: Story = {
    args: {
        label: 'Danger',
        severity: 'danger',
        size: 'small',
        type: 'button'
    },
};

export const Warning: Story = {
    args: {
        label: 'Warning',
        severity: 'warning',
        size: 'small',
        type: 'button'
    },
};

export const Success: Story = {
    args: {
        label: 'Success',
        severity: 'success',
        size: 'small',
        type: 'button'
    },
};