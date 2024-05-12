import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Card } from '../components/card/card.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  http = inject(HttpClient);

  constructor() { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>('assets/data.json');
  }
}