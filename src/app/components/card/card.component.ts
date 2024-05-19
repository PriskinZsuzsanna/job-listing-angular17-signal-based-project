import { Component, InputSignal, input, output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { Card } from './card.types';
import { CardTileComponent } from '../card-tile/card-tile.component';
import { Type, Response } from '../card-tile/card-tyle.types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LabelComponent, CardTileComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  Type = Type; 
  card: InputSignal<Card> = input.required<Card>();
  select = output<Response>();

  onSelect(response: Response) {
    this.select.emit(response);
  }
}
