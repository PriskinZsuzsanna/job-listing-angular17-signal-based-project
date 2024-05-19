import { Component, InputSignal, input, output } from '@angular/core';
import { Type, Response } from './card-tyle.types';

@Component({
  selector: 'app-card-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-tile.component.html',
  styleUrl: './card-tile.component.scss'
})
export class CardTileComponent {
  label = input.required<string>();
  type = input.required<Type>();
  select = output<Response>();
  closeFilter = output<Response>();
  closable = input<boolean>();

  selectTile() {
    this.select.emit({label: this.label(), type: this.type()});
  }
  
  close() {
    this.closeFilter.emit({label: this.label(), type: this.type()});
  }
}
