import { Component, WritableSignal, signal } from '@angular/core';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.types';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FilterContainerComponent, CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  cards: Array<Card> = new Array<Card>();
  isFilterContainer: WritableSignal<boolean> = signal<boolean>(false);
}
