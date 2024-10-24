import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAddFormComponent } from './pokemon-add-form.component';

describe('PokemonAddFormComponent', () => {
  let component: PokemonAddFormComponent;
  let fixture: ComponentFixture<PokemonAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
