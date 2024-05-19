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
  filterArray = signal<Array<Response>>([]);
  filterRole = signal<string | null>(null);
  filterLevel = signal<string | null>(null);
  filterLanguages = signal<Array<string>>([]);
  isFilterContainer = computed(() => this.filterArray.length);

  selectedCards = computed(() => {
    const roleFilter = this.filterRole();
    const levelFilter = this.filterLevel();
    const languageFilters = this.filterLanguages();

    return this.cards().filter(card => {
      const matchesRole = roleFilter ? card.role === roleFilter : true;
      const matchesLevel = levelFilter ? card.level === levelFilter : true;
      const matchesLanguages = languageFilters.length > 0 ? languageFilters.some(language => card.languages.includes(language)) : true;

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
    this.filterArray.update((array) => [...array, response]);
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

  onSelectLanguage(language: string) {
    this.filterLanguages.update(languages => [...languages, language]);
  }

  onClose(response: Response) {
    this.filterArray.set(this.filterArray().filter((item: Response) => item.label !== response.label));
    if(response.type === 'Role') {
      this.filterRole.set(null);
      return;
    }
    if(response.type === 'Level') {
      this.filterLevel.set(null);
      return;
    }
    if(response.type === 'Language') {
      this.filterLanguages.update(languages => languages.filter(language => language !== response.label));
    }
  }

  onClearFilters() {
    this.filterRole.set(null);
    this.filterLevel.set(null);
    this.filterLanguages.set([]);
    this.filterArray.set([]);
  }
}
