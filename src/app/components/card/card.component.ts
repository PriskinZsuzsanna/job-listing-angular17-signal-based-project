import { Component, InputSignal, input, output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { Card } from './card.types';
import { CardTileComponent } from '../card-tile/card-tile.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LabelComponent, CardTileComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  card: InputSignal<Card> = input.required<Card>();
  select = output<string>();

  onSelect(label: string) {
    this.select.emit(label);
  }
}
