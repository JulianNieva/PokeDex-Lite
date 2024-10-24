import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModuleRoutingModule } from './home-module-routing.module';
import { HomeComponent } from './home/home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonModifyForm } from './pokemon-modify-form/pokemon-modify-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';
import { PokemonAddFormComponent } from './pokemon-add-form/pokemon-add-form.component';


@NgModule({
  declarations: [HomeComponent, PokemonListComponent, PokemonModifyForm, PokemonViewComponent, PokemonAddFormComponent],
  imports: [
    CommonModule,
    HomeModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModuleModule { }
