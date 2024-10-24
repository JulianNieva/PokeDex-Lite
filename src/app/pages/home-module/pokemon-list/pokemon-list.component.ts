import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  @Input() pokemonList:any
  @Output() pokemonToModify:EventEmitter<any> = new EventEmitter<any>()
  @Output() showPokemonClicked:EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void { }

  pokemonClicked(pokemon:any)
  {
    this.showPokemonClicked.emit(pokemon);
  }

  modifyPokemon(pokemon:any)
  {
    this.pokemonToModify.emit(pokemon);
  }

}
