import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

type ButtonSeverity = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'large';

@Component({
    selector: 'lib-button',
    imports: [NgClass],
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class Button {
    label = input<string>('');
    type = input<ButtonType>('button');
    severity = input<ButtonSeverity>('primary');
    size = input<ButtonSize>('small');

    handleClick = output<void>();
}
