import { Component, input } from '@angular/core';
import { Label } from './label.types';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  label = input.required<string>();
  background = input.required<string>();
}
