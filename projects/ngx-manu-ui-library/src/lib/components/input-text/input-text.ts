import { Component, input } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from '@utils';

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;
type InputType = 'text' | 'textarea' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';

@Component({
    selector: 'lib-input-text',
    imports: [FormsModule],
    templateUrl: './input-text.html',
    styleUrl: './input-text.css',
    providers: [CUSTOM_CONTROL_VALUE_ACCESSOR(InputText)]
})
export class InputText implements ControlValueAccessor {
    label = input<string>('');
    placeholder = input<string>('');
    fieldType = input<InputType>('text');
    id = input<string>(`input-${Math.random().toString(36).substring(2, 9)}`);

    value = '';
    disabled = false;

    onChange: OnChangeFn = () => {
        // no-op
    };
    onTouched: OnTouchedFn = () => {
        // no-op
    };

    writeValue(value: string | null): void {
        this.value = value || '';
    }

    registerOnChange(fn: OnChangeFn): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchedFn): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.onChange(this.value);
    }

    onBlur(): void {
        this.onTouched();
    }

}
