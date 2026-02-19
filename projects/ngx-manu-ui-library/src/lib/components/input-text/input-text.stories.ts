import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { InputText } from './input-text';

const meta: Meta<InputText> = {
    title: 'Components/InputText',
    component: InputText,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ReactiveFormsModule],
        }),
    ],
    parameters: {
        actions: { argTypesRegex: '^on.*|^handle.*' },
    },
    args: {
        label: 'Input Text',
        placeholder: '',
        id: `input-${Math.random().toString(36).substring(2, 9)}`,
    },
    argTypes: {
        fieldType: {
            control: 'select',
            options: ['text', 'textarea', 'password', 'email', 'number', 'search', 'tel', 'url'],
        },
        fieldStyle: {
            control: 'select',
            options: ['primary', 'secondary', 'outline'],
        },
    },
};

export default meta;

type Story = StoryObj<InputText>;

export const Primary: Story = {
    args: {
        label: 'Primary',
        placeholder: 'Enter text here',
        fieldStyle: 'primary'
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        placeholder: 'Enter secondary text here',
        fieldStyle: 'secondary'
    },
};

export const Outline: Story = {
    args: {
        label: 'Outline',
        placeholder: 'Enter outline text here',
        fieldStyle: 'outline'
    },
};

export const WithValidation: Story = {
    render: (args) => {
        const control = new FormControl('', [Validators.required, Validators.minLength(5)]);
        control.markAsTouched();

        return {
            props: {
                ...args,
                control: control
            },
            template: `<lib-input-text [formControl]="control" [label]="label" [fieldStyle]="fieldStyle" />
            `,
        };
    },
    args: {
        label: 'Invalid Field',
        fieldStyle: 'primary'
    },
};

export const Disabled: Story = {
    render: (args) => ({
        props: { ...args, control: new FormControl({ value: 'Disabled text', disabled: true }) },
        template: `<lib-input-text [formControl]="control" [label]="label" [fieldStyle]="fieldStyle" />`
    }),
    args: {
        label: 'Disabled field',
        fieldStyle: 'primary',
    },
};