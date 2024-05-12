import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-card-tile',
  standalone: true,
  imports: [],
  templateUrl: './card-tile.component.html',
  styleUrl: './card-tile.component.scss'
})
export class CardTileComponent {
  label = input<string>();
}
