import { Component, InputSignal, computed, input, output } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { Card } from './card.types';
import { CardTileComponent } from '../card-tile/card-tile.component';
import { Type, TyleData } from '../card-tile/card-tyle.types';
import { Label } from '../label/label.types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LabelComponent, CardTileComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  Type = Type; 
  Label = Label;
  card: InputSignal<Card> = input.required<Card>();
  select = output<TyleData>();
  imageSource = computed(() => {
    return (this.card().company).toLowerCase().replaceAll(' ', '-').replace('.', '');
  });

  onSelect(TyleData: TyleData) {
    this.select.emit(TyleData);
  }
}
