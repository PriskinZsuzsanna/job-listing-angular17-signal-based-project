import { Component, input, output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { CardTileComponent } from '../card-tile/card-tile.component';
import { Type, Response } from '../card-tile/card-tyle.types';

@Component({
  selector: 'app-filter-container',
  standalone: true,
  imports: [CardTileComponent],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss'
})
export class FilterContainerComponent {
  type: Type = Type.Filtered;
  items = input<Array<Response>>([]);
  clearItems = output<void>();
  closeClick = output<Response>();

  clear() {
    this.clearItems.emit();
  }

  onClose(response: Response) {
    this.closeClick.emit(response);
  }
}
