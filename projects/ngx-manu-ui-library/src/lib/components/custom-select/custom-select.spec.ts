import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CustomSelect, SelectOption } from './custom-select';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, CustomSelect],
    template: `
        <form>
        <lib-custom-select
            [formControl]="control"
            label="Select"
            [options]="options">
        </lib-custom-select>
        </form>
    `
})
class HostComponent {
    control = new FormControl<string | null>(null, {
        validators: [Validators.required]
    });

    options: SelectOption[] = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' }
    ];
}

describe('CustomSelect', () => {
    let fixture: ComponentFixture<CustomSelect>;
    let component: CustomSelect;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CustomSelect]
        }).compileComponents();

        fixture = TestBed.createComponent(CustomSelect);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('options', [
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' }
        ]);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values', () => {
        expect(component.value()).toBeNull();
        expect(component.disabled()).toBe(false);
        expect(component.isOpen()).toBe(false);
        expect(component.fieldStyle()).toBe('primary');
    });

    it('should compute selectedLabel correctly', () => {
        component.writeValue('2');
        fixture.detectChanges();

        expect(component.selectedLabel()).toBe('Two');
    });

    it('should open and close', () => {
        component.open();
        expect(component.isOpen()).toBe(true);
        expect(component.overlayRef).toBeTruthy();

        component.close();
        expect(component.isOpen()).toBe(false);
        expect(component.overlayRef).toBeUndefined();
    });

    it('should toggle open state', () => {
        component.toggle();
        expect(component.isOpen()).toBe(true);
        expect(component.overlayRef).toBeTruthy();

        component.toggle();

        expect(component.isOpen()).toBe(false);
        expect(component.overlayRef).toBeUndefined();

        component.setDisabledState(true);
        component.toggle();

        expect(component.isOpen()).toBe(false);
        expect(component.overlayRef).toBeUndefined();
    });

    it('should select option correctly', () => {
        const onChange = vi.fn();
        component.registerOnChange(onChange);

        component.select({ label: 'One', value: '1' }, 0);

        expect(component.value()).toBe('1');
        expect(onChange).toHaveBeenCalledWith('1');
        expect(component.isOpen()).toBe(false);
    });

    it('should update disabled state', () => {
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });

    it('should handle ArrowDown navigation', () => {
        component.activeIndex.set(0);
        component.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(component.activeIndex()).toBe(1);
    });

    it('should handle ArrowUp navigation with wrap', () => {
        component.activeIndex.set(0);
        component.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(component.activeIndex()).toBe(1);
    });

    it('should select with Enter key', () => {
        const onChange = vi.fn();
        component.registerOnChange(onChange);

        component.activeIndex.set(0);

        component.handleKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

        expect(onChange).toHaveBeenCalledWith('1');
    });

    it('should close with Escape key', () => {
        component.open();
        component.handleKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(component.isOpen()).toBe(false);
    });

    // --------------------------------
    it('should trigger open on Enter when closed', () => {
        expect(component.isOpen()).toBe(false);

        component.onTriggerKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

        expect(component.isOpen()).toBe(true);
    });

    it('should trigger open on Space when closed', () => {
        component.onTriggerKeydown(new KeyboardEvent('keydown', { key: ' ' }));

        expect(component.isOpen()).toBe(true);
    });

    // --
    it('should trigger open on ArrowDown', () => {
        component.onTriggerKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(component.isOpen()).toBe(true);
    });

    it('should trigger open on ArrowUp', () => {
        component.onTriggerKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(component.isOpen()).toBe(true);
    });

    it('should prevent default on Enter', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        const spy = vi.spyOn(event, 'preventDefault');

        component.onTriggerKeydown(event);

        expect(spy).toHaveBeenCalled();
    });
});

describe('CustomSelect (with FormControl)', () => {
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
        host.control.setValue('2');
        fixture.detectChanges();

        const trigger = fixture.debugElement.query(By.css('.select-trigger')).nativeElement;
        expect(trigger.textContent).toContain('Two');
    });

    it('should sync value from component to FormControl', () => {
        const selectDebug = fixture.debugElement.query(By.directive(CustomSelect));
        const selectInstance = selectDebug.componentInstance as CustomSelect;

        selectInstance.select({ label: 'One', value: '1' }, 0);
        fixture.detectChanges();

        expect(host.control.value).toBe('1');
    });

    it('should show validation error when invalid and touched', () => {
        host.control.markAsTouched();
        fixture.detectChanges();

        const error = fixture.debugElement.query(By.css('.error-text'));
        expect(error).toBeTruthy();
    });

    it('should disable when FormControl is disabled', () => {
        host.control.disable();
        fixture.detectChanges();

        const trigger = fixture.debugElement.query(By.css('.select-trigger')).nativeElement;
        expect(trigger.classList).toContain('disabled');
    });
});
