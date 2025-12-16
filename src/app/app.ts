import { ChangeDetectionStrategy, Component, computed, effect, signal, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SelectUserPage } from './pages/select-user-page/select-user-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelectUserPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('poke-ng');
  protected readonly priceHT = signal(20);
  protected readonly priceTTC = computed(() => this.priceHT() * 1.2);

  private logPriceChange = effect(() => {
    console.log(`Price TTC updated: ${this.priceTTC()}`);
    console.log(untracked(() => this.priceHT()));
  });

  constructor() {
    setTimeout(() => {
      this.title.set('poke-ng! UPDATED');
      this.title.update(actualValue => actualValue + '!!!');

      this.priceHT.set(30);
    }, 1000);
  }
}
