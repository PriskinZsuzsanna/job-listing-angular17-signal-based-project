import { Component, input, output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { FilterTileComponent } from '../filter-tile/filter-tile.component';
import { CardTileComponent } from '../card-tile/card-tile.component';

@Component({
  selector: 'app-filter-container',
  standalone: true,
  imports: [CardTileComponent],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss'
})
export class FilterContainerComponent {
  items = input<Array<string>>([]);
  clearItems = output<void>();

  clear() {
    this.clearItems.emit();
  }
}
