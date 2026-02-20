import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CustomSelect } from './custom-select';

const meta: Meta<CustomSelect> = {
    title: 'Components/CustomSelect',
    component: CustomSelect,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ReactiveFormsModule]
        })
    ],
    args: {
        label: 'Select',
        placeholder: 'Choose option',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'User', value: 'user' },
            { label: 'Super User', value: 'super-user' },
            { label: 'Guest', value: 'guest' }
        ]
    },
    argTypes: {
        fieldStyle: {
            control: 'select',
            options: ['primary', 'secondary', 'outline']
        }
    }
};

export default meta;
type Story = StoryObj<CustomSelect>;

export const Primary: Story = {
    args: { fieldStyle: 'primary' }
};

export const Secondary: Story = {
    args: { fieldStyle: 'secondary' }
};

export const Outline: Story = {
    args: { fieldStyle: 'outline' }
};

export const WithValidation: Story = {
    render: (args) => {
        const control = new FormControl('', Validators.required);
        control.markAsTouched();

        return {
            props: { ...args, control },
            template: `
                <lib-custom-select
                [formControl]="control"
                [label]="label"
                [options]="options"
                [fieldStyle]="fieldStyle"
                />
            `
        };
    },
    args: { fieldStyle: 'primary' }
};

export const Disabled: Story = {
    render: (args) => ({
        props: {
            ...args,
            control: new FormControl({ value: 'admin', disabled: true })
        },
        template: `
            <lib-custom-select
                [formControl]="control"
                [label]="label"
                [options]="options"
                [fieldStyle]="fieldStyle"
            />
        `
    }),
    args: { fieldStyle: 'primary' }
};
