import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.types';
import { CardService } from '../../services/card.service';
import { TyleData } from '../card-tile/card-tyle.types';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FilterContainerComponent, CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  cardService = inject(CardService);

  cards = signal<Array<Card>>([]);
  filterArray = signal<Array<TyleData>>([]);
  filterRole = signal<string | null>(null);
  filterLevel = signal<string | null>(null);
  filterLanguages = signal<Array<string>>([]);
  isFilterContainer = computed(() => this.filterArray.length);

  selectedCards = computed(() => {

    return this.cards().filter(card => {
      const matchesRole = this.filterRole() ? card.role === this.filterRole() : true;
      const matchesLevel = this.filterLevel() ? card.level === this.filterLevel() : true;
      const matchesLanguages = this.filterLanguages().length > 0 ? this.filterLanguages().some(language => card.languages.includes(language)) : true;

      return matchesRole && matchesLevel && matchesLanguages;
    });
  });

  ngOnInit(): void {
    this.cardService.getCards()
      .subscribe((data: Card[]) => {
        this.cards.set(data);
      });
  }

  onSelect(TyleData: TyleData) {
    this.filterArray.update((array) => [...array, TyleData]);
    if (TyleData.type === 'Role') {
      this.filterRole.set(TyleData.label);
      return;
    }
    if (TyleData.type === 'Level') {
      this.filterLevel.set(TyleData.label);
      return;
    }
    if (TyleData.type === 'Language') {
      this.filterLanguages.update(languages => [...languages, TyleData.label]);
      return;
    }
  }

  onClose(TyleData: TyleData) {
    this.filterArray.set(this.filterArray().filter((item: TyleData) => item.label !== TyleData.label));
    if (TyleData.type === 'Role') {
      this.filterRole.set(null);
      return;
    }
    if (TyleData.type === 'Level') {
      this.filterLevel.set(null);
      return;
    }
    if (TyleData.type === 'Language') {
      this.filterLanguages.update(languages => languages.filter(language => language !== TyleData.label));
      return;
    }
  }

  onClearFilters() {
    this.filterRole.set(null);
    this.filterLevel.set(null);
    this.filterLanguages.set([]);
    this.filterArray.set([]);
  }
}
