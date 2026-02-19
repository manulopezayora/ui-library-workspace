import { Component, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;
type InputType = 'text' | 'textarea' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
type FieldStyle = 'primary' | 'secondary' | 'outline';

@Component({
    selector: 'lib-input-text',
    imports: [FormsModule],
    templateUrl: './input-text.html',
    styleUrl: './input-text.css',
})
export class InputText implements ControlValueAccessor {

    private static nextId = 0;

    id = input<string>(`input-${InputText.nextId++}`);
    label = input<string>('');
    placeholder = input<string>('');
    fieldType = input<InputType>('text');
    fieldStyle = input<FieldStyle>('primary');

    value = signal<string>('');
    disabled = signal<boolean>(false);


    public ngControl = inject(NgControl, { self: true, optional: true });

    constructor() {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    get isInvalid(): boolean {
        const control = this.ngControl;

        return !!(control?.invalid && (control.touched || control.dirty));
    }

    get errorMessages(): string[] {
        const errors = this.ngControl?.errors;

        return errors ? Object.keys(errors) : [];
    }

    private onChange: OnChangeFn = () => {
        // no-op
    };

    private onTouched: OnTouchedFn = () => {
        // no-op
    };

    writeValue(value: string | null): void {
        this.value.set(value || '');
    }

    registerOnChange(fn: OnChangeFn): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchedFn): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onInputChange(event: Event): void {
        const newValue = (event.target as HTMLInputElement).value;
        this.value.set(newValue);
        this.onChange(newValue);
    }

    onBlur(): void {
        this.onTouched();
    }

}
