import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonModifyForm } from './pokemon-modify-form';

describe('PokemonModifyForm', () => {
  let component: PokemonModifyForm;
  let fixture: ComponentFixture<PokemonModifyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonModifyForm]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonModifyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
