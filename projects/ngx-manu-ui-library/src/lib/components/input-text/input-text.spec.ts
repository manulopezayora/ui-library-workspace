import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { InputText } from './input-text';

describe('InputText', () => {
    let component: InputText;
    let fixture: ComponentFixture<InputText>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputText]
        }).compileComponents();

        fixture = TestBed.createComponent(InputText);
        component = fixture.componentInstance;
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should print <label> element', () => {
        fixture.componentRef.setInput('label', 'Test Input');
        fixture.detectChanges();

        const labelElement = fixture.nativeElement.querySelector('label');

        expect(labelElement).toBeTruthy();
        expect(labelElement.textContent).toBe('Test Input');
    });

    it('should have default input values', () => {
        expect(component.label()).toBe('');
        expect(component.placeholder()).toBe('');
        expect(component.fieldType()).toBe('text');
        expect(component.id()).toContain('input-');
    });

    it('should write value via ControlValueAccessor', () => {
        component.writeValue('hello');
        expect(component.value).toBe('hello');

        component.writeValue(null);
        expect(component.value).toBe('');
    });

    it('should register and call onChange on input event', () => {
        const onChange = vi.fn();
        component.registerOnChange(onChange);

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.value = 'new value';
        inputEl.triggerEventHandler('input', {
            target: inputEl.nativeElement
        });

        expect(component.value).toBe('new value');
        expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('should register and call onTouched on blur', () => {
        const onTouched = vi.fn();
        component.registerOnTouched(onTouched);

        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('blur');

        expect(onTouched).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBe(true);

        component.setDisabledState(false);
        expect(component.disabled).toBe(false);
    });

    it('should update value using onInputChange()', () => {
        const onChange = vi.fn();
        component.registerOnChange(onChange);

        component.onInputChange({
            target: { value: 'typed text' }
        } as unknown as Event);

        expect(component.value).toBe('typed text');
        expect(onChange).toHaveBeenCalledWith('typed text');
    });

    it('should call onTouched using onBlur()', () => {
        const onTouched = vi.fn();
        component.registerOnTouched(onTouched);

        component.onBlur();

        expect(onTouched).toHaveBeenCalled();
    });

    it('should allow setting signal inputs dynamically', () => {
        fixture.componentRef.setInput('label', 'Email');
        fixture.componentRef.setInput('placeholder', 'Enter email');
        fixture.componentRef.setInput('fieldType', 'email');

        expect(component.label()).toBe('Email');
        expect(component.placeholder()).toBe('Enter email');
        expect(component.fieldType()).toBe('email');
    });
});
