import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

type Severity = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success';

@Component({
    selector: 'lib-button',
    imports: [NgClass],
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class Button {
    label = input<string>('');
    severity = input<Severity>('primary');
    size = input<'small' | 'large'>('small');

    handleClick = output<void>();
}
