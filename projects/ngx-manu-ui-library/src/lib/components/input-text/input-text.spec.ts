import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputText } from './input-text';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, InputText],
    template: `
    <form>
      <lib-input-text [formControl]="control" label="Email"></lib-input-text>
    </form>
  `
})
class HostComponent {
    control = new FormControl('', { validators: [Validators.required] });
}

describe('InputText', () => {
    let fixture: ComponentFixture<InputText>;
    let component: InputText;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputText]
        }).compileComponents();

        fixture = TestBed.createComponent(InputText);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values', () => {
        expect(component.value()).toBe('');
        expect(component.disabled()).toBe(false);
        expect(component.fieldType()).toBe('text');
        expect(component.fieldStyle()).toBe('primary');
    });

    it('should update value signal on input', () => {
        const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

        input.value = 'hello';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.value()).toBe('hello');
    });

    it('should update value when writeValue is called', () => {
        component.writeValue('abc');

        expect(component.value()).toBe('abc');
    });

    it('should mark as touched on blur', () => {
        const onTouched = vi.fn();
        component.registerOnTouched(onTouched);

        component.onBlur();

        expect(onTouched).toHaveBeenCalled();
    });

    it('should update disabled state', () => {
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });
});

describe('InputText (with FormControl)', () => {
    let fixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should sync value from FormControl to component', () => {
        host.control.setValue('test@example.com');
        fixture.detectChanges();

        const input = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(input.value).toBe('test@example.com');
    });

    it('should sync value from component to FormControl', () => {
        const inputEl = fixture.debugElement.query(By.css('input'));
        const input = inputEl.nativeElement as HTMLInputElement;

        input.value = 'new value';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(host.control.value).toBe('new value');
    });

    it('should mark control as touched on blur', () => {
        const inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(host.control.touched).toBe(true);
    });

    it('should show validation error when invalid and touched', () => {
        host.control.markAsTouched();
        fixture.detectChanges();

        const error = fixture.debugElement.query(By.css('.error-text'));

        expect(error).toBeTruthy();
    });

    it('should disable input when FormControl is disabled', () => {
        host.control.disable();
        fixture.detectChanges();

        const input = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(input.disabled).toBe(true);
    });
});