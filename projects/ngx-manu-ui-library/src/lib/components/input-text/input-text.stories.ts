import type { Meta, StoryObj } from '@storybook/angular';
import { InputText } from './input-text';

const meta: Meta<InputText> = {
    title: 'Components/InputText',
    component: InputText,
    tags: ['autodocs'],
    parameters: {
        actions: { argTypesRegex: '^on.*|^handle.*' },
    },
    args: {
        label: 'Input Text',
        placeholder: '',
        fieldType: 'text',
        id: `input-${Math.random().toString(36).substring(2, 9)}`,
    },
    argTypes: {
        fieldType: {
            control: 'select',
            options: ['text', 'textarea', 'password', 'email', 'number', 'search', 'tel', 'url'],
        },
    },
};

export default meta;

type Story = StoryObj<InputText>;

export const Primary: Story = {
    args: {
        label: 'Primary',
        placeholder: 'Enter text here',
        fieldType: 'text'
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        placeholder: 'Enter secondary text here',
        fieldType: 'password'
    },
};