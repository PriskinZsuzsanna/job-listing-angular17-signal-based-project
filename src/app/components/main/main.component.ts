import { Component, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.types';
import { CardService } from '../../services/card.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FilterContainerComponent, CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  cardService = inject(CardService);

  cards: Array<Card> = new Array<Card>();
  filterArray = signal<Array<string>>([]);
  isFilterContainer = computed(() => this.filterArray().length > 0);
  selectedCards = computed(() => {
    //try using it in html!!!!!!!!!!!
    if(this.filterArray().length) {
      return this.cards.filter((card) => this.filterArray().includes(card.role ||card.position))
    }
    return this.cards;
  })

  ngOnInit(): void {
    this.cardService.getCards()
    .pipe(
      tap((data: Card[]) => console.log(data))
    )
    .subscribe((data: Card[]) => {
      this.cards = data;
    })
  }

  onSelect(label: string) {
    this.filterArray.update((array) => [...array, label]);
  }

  onClearItems() {
    this.filterArray.set([]);
  }
}
