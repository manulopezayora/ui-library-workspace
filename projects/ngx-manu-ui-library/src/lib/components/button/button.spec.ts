import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
    let component: Button;
    let fixture: ComponentFixture<Button>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Button]
        }).compileComponents();

        fixture = TestBed.createComponent(Button);
        component = fixture.componentInstance;
        await fixture.whenStable();
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values', () => {
        expect(component.label()).toBe('');
        expect(component.severity()).toBe('primary');
        expect(component.size()).toBe('small');
    });

    it('should update values', () => {
        fixture.componentRef.setInput('label', 'Test Button');
        fixture.componentRef.setInput('severity', 'danger');
        fixture.componentRef.setInput('size', 'large');

        expect(component.label()).toBe('Test Button');
        expect(component.severity()).toBe('danger');
        expect(component.size()).toBe('large');
    });

    it('should emit handleClick when the button is clicked', async () => {
        const emitSpy = vi.spyOn(component.handleClick, 'emit');
        const buttonElement = fixture.nativeElement.querySelector('button');
        buttonElement.click();

        await fixture.whenStable();
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalledTimes(1);
    });
});
