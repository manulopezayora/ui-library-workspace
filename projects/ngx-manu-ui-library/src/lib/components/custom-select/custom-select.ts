import {
    Overlay,
    OverlayModule,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    ElementRef,
    inject,
    input,
    signal,
    TemplateRef,
    viewChild,
    ViewContainerRef
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NgControl
} from '@angular/forms';

type FieldStyle = 'primary' | 'secondary' | 'outline';

export interface SelectOption {
    label: string;
    value: string;
}

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;

@Component({
    selector: 'lib-custom-select',
    standalone: true,
    imports: [CommonModule, FormsModule, OverlayModule],
    templateUrl: './custom-select.html',
    styleUrl: './custom-select.css'
})
export class CustomSelect implements ControlValueAccessor {

    private static nextId = 0;

    id = input<string>(`select-${CustomSelect.nextId++}`);
    label = input<string>('');
    placeholder = input<string>('Select option');
    fieldStyle = input<FieldStyle>('primary');
    options = input<SelectOption[]>([]);

    value = signal<string | null>(null);
    disabled = signal<boolean>(false);
    activeIndex = signal<number>(-1);
    isOpen = signal(false);

    selectedLabel = computed(() => (this.options().find(o => o.value === this.value())?.label ?? ''));
    triggerWidth = computed(() => this.trigger()?.nativeElement.offsetWidth ?? 0);

    trigger = viewChild<ElementRef<HTMLElement>>('trigger');
    panelTemplate = viewChild<TemplateRef<ElementRef<HTMLElement>>>('panel');

    overlayRef?: OverlayRef;

    public ngControl = inject(NgControl, { self: true, optional: true });
    private overlay = inject(Overlay);
    private viewContainerRef = inject(ViewContainerRef);

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

    toggle(): void {
        if (this.disabled()) return;

        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    open(): void {
        if (this.isOpen()) return;
        if (!this.trigger()) return;

        this.isOpen.set(true);

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.trigger()!)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                }
            ])
            .withFlexibleDimensions(false)
            .withPush(false);

        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            width: this.triggerWidth()
        });

        this.overlayRef.backdropClick().subscribe(() => this.close());

        this.overlayRef.keydownEvents().subscribe(event =>
            this.handleKeydown(event)
        );

        const portal = new TemplatePortal(
            this.panelTemplate()!,
            this.viewContainerRef
        );

        this.overlayRef.attach(portal);

        setTimeout(() => {
            this.overlayRef?.overlayElement.focus();
        });

        const selectedIndex = this.options().findIndex(
            o => o.value === this.value()
        );

        this.activeIndex.set(selectedIndex >= 0 ? selectedIndex : -1);
    }

    close(): void {
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
        this.isOpen.set(false);
        this.activeIndex.set(-1);
        this.trigger()?.nativeElement.focus();
        this.onTouched();
    }

    select(option: SelectOption, index: number): void {
        this.value.set(option.value);
        this.onChange(option.value);
        this.activeIndex.set(index);
        this.close();
    }

    onTriggerKeydown(event: KeyboardEvent): void {

        if (this.disabled()) return;

        if (this.isOpen()) return;

        switch (event.key) {

            case 'Enter':
            case ' ':
                event.preventDefault();
                this.open();
                break;

            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                this.open();
                break;
        }
    }

    handleKeydown(event: KeyboardEvent): void {
        if (!this.options().length) return;

        const options = this.options();
        let index = this.activeIndex();

        switch (event.key) {

            case 'ArrowDown':
                this.cleanKeydownEvents(event);
                index = (index + 1) % options.length;
                this.activeIndex.set(index);
                this.scrollToActive();
                break;

            case 'ArrowUp':
                this.cleanKeydownEvents(event);
                index = index <= 0 ? options.length - 1 : index - 1;
                this.activeIndex.set(index);
                this.scrollToActive();
                break;

            case 'Enter':
                this.cleanKeydownEvents(event);
                if (index >= 0) {
                    this.select(options[index], index);
                }
                break;

            case 'Escape':
                this.cleanKeydownEvents(event);
                this.close();
                break;
        }
    }

    writeValue(value: string | null): void {
        this.value.set(value);
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

    private onChange: OnChangeFn = () => {
        // noop
    };

    private onTouched: OnTouchedFn = () => {
        // noop
    };

    private scrollToActive(): void {
        setTimeout(() => {
            const panel = this.overlayRef?.overlayElement;
            const active = panel?.querySelector('.active');
            active?.scrollIntoView({ block: 'nearest' });
        });
    }

    private cleanKeydownEvents(event: KeyboardEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }
}
