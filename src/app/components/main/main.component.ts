import { Component, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.types';
import { CardService } from '../../services/card.service';
import { tap } from 'rxjs';
import { Response } from '../card-tile/card-tyle.types';

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
  filterArray = signal<Array<string>>([]);
  filterRole = signal<string | null>(null);
  filterLevel = signal<string | null>(null);
  filterLanguages = signal<Array<string>>([]);
  isFilterContainer = computed(() => this.filterRole() || this.filterLevel() || this.filterLanguages().length > 0);

  selectedCards = computed(() => {
    const roleFilter = this.filterRole();
    const levelFilter = this.filterLevel();
    const languageFilters = this.filterLanguages();

    return this.cards().filter(card => {
      const matchesRole = roleFilter ? card.role === roleFilter : true;
      const matchesLevel = levelFilter ? card.level === levelFilter : true;
      const matchesLanguages = languageFilters.length > 0 ? languageFilters.every(language => (card.languages || []).includes(language)) : true;

      return matchesRole && matchesLevel && matchesLanguages;
    });
  });

  ngOnInit(): void {
    this.cardService.getCards()
      .subscribe((data: Card[]) => {
        this.cards.set(data);
      });
  }

  onSelect(response: Response) {
    this.filterArray.update((array) => [...array, response.label]);
    console.log(this.filterArray());
    if (response.type === 'Role') {
      this.onSelectRole(response.label);
      return;
    }
    if (response.type === 'Level') {
      this.onSelectLevel(response.label);
      return;
    }
    if (response.type === 'Language') {
      this.onSelectLanguage(response.label);
      return;
    }
  }

  onSelectRole(role: string) {
    this.filterRole.set(role);
  }

  onSelectLevel(level: string) {
    this.filterLevel.set(level);
  }

  onSelectLanguage(label: string) {
    this.filterLanguages.update(labels => [...labels, label]);
  }

  onClearFilters() {
    this.filterRole.set(null);
    this.filterLevel.set(null);
    this.filterLanguages.set([]);
    this.filterArray.set([]);
  }
}
