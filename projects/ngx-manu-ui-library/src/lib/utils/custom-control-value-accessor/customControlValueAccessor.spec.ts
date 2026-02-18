import { TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputText } from '@components';

describe('CUSTOM_CONTROL_VALUE_ACCESSOR', () => {
  it('should register the component as NG_VALUE_ACCESSOR', async () => {
    await TestBed.configureTestingModule({
      imports: [InputText]
    }).compileComponents();

    const fixture = TestBed.createComponent(InputText);

    const accessors = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);

    expect(accessors).toBeDefined();
    expect(Array.isArray(accessors)).toBe(true);

    const accessor = accessors.find(
      (a: unknown) => a instanceof InputText
    );

    expect(accessor).toBeTruthy();
  });
});