import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeInput } from './pokemon-type.input';

describe('PokemonTypeInput', () => {
  let component: PokemonTypeInput;
  let fixture: ComponentFixture<PokemonTypeInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTypeInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTypeInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
