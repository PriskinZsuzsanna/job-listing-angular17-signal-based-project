import { Component, input, output } from '@angular/core';
import { CardTileComponent } from '../card-tile/card-tile.component';
import { Type, TyleData } from '../card-tile/card-tyle.types';

@Component({
  selector: 'app-filter-container',
  standalone: true,
  imports: [CardTileComponent],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss'
})
export class FilterContainerComponent {
  type: Type = Type.Filtered;
  items = input<Array<TyleData>>([]);
  clearItems = output<void>();
  closeClick = output<TyleData>();

  clear() {
    this.clearItems.emit();
  }

  onClose(TyleData: TyleData) {
    this.closeClick.emit(TyleData);
  }
}
