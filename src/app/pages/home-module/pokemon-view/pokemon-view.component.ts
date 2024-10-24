import { Component, Input,OnInit } from '@angular/core';
import { PokedexService } from '../../../services/pokedex.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.scss'
})
export class PokemonViewComponent implements OnInit {

  possibleEvolutions:any = null
  @Input() pokemonToShow:any

  ngOnInit(): void {
    const evolutions = this.pokedexSrv.getPokemonEvolutionChain(this.pokemonToShow)
    if(evolutions.length != 0)
    {
      this.possibleEvolutions = evolutions
    }
  }


  constructor(private pokedexSrv:PokedexService){

  }
}
