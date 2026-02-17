import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  label = input<string>('');
  type = input<'primary' | 'secondary' | 'tertiary'>('primary');
  size = input<'small' | 'large'>('small');

  constructor() {
    console.log('test husky');
  }
}
