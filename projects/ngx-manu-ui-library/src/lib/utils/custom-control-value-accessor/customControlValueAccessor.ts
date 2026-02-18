import { forwardRef, Provider, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_CONTROL_VALUE_ACCESSOR = <T extends ControlValueAccessor>(component: Type<T>): Provider => ({
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
});