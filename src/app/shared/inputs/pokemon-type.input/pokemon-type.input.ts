import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

// https://angular.dev/guide/forms/signals/custom-controls
@Component({
  selector: 'app-pokemon-type.input',
  imports: [],
  templateUrl: './pokemon-type.input.html',
  styleUrl: './pokemon-type.input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTypeInput implements FormValueControl<string> {
  value = model<string>('');
}
