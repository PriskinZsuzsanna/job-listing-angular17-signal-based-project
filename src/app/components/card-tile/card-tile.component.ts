import { Component, InputSignal, input, output } from '@angular/core';

@Component({
  selector: 'app-card-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-tile.component.html',
  styleUrl: './card-tile.component.scss'
})
export class CardTileComponent {
  label = input.required<string>();
  select = output<string>();
  closable = input<boolean>();

  selectTile() {
    this.select.emit(this.label());
  }
}
