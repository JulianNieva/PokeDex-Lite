import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokedexService } from '../../../services/pokedex.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Type } from '../../../interfaces/Type';
import { Ability } from '../../../interfaces/Abilities';

@Component({
  selector: 'app-pokemon-add-form',
  templateUrl: './pokemon-add-form.component.html',
  styleUrl: './pokemon-add-form.component.scss'
})
export class PokemonAddFormComponent implements OnInit{

  pokemonAddForm:FormGroup;

  selectedTypes:Type[] = []
  typesList:Type[] = []
  selectedType:Type = {id:0,name:""}
  
  abilitiesList:Ability[] = []
  selectedAbilities:Ability[] = []
  selectedAbility:Ability = {id:0,name:"",description:""};

  @Output() addPokemon:EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
    const storedTypes = localStorage.getItem('Types');
    const storedAbilities = localStorage.getItem("Abilities")
    if (storedTypes && storedAbilities) {
      this.typesList = JSON.parse(storedTypes);
      this.abilitiesList = JSON.parse(storedAbilities)
    }
  }

  constructor(private pokedexSrv:PokedexService)
  {
    this.pokemonAddForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      level:new FormControl("",[Validators.required,Validators.pattern("^[0-9]*$")]),
    })
    
  }

  validatePokemon(){
    if(this.pokemonAddForm.valid && this.selectedAbilities.length !== 0 && this.selectedTypes.length !== 0){
      
      const pokemonToAdd = {
        name:this.pokemonAddForm.controls['name'].value,
        level:this.pokemonAddForm.controls['level'].value,
        typesList:this.selectedTypes,
        abilitiesList:this.selectedAbilities,
      }

      console.info(pokemonToAdd)
      
      this.addPokemon.emit(pokemonToAdd);
    }
    else{
      alert("Invalid form");
    }
  }

  addAbility(){
    const result = this.selectedAbilities.find(ab => ab.id === this.selectedAbility.id)

    if(!result)
    {
      this.selectedAbilities.push(this.selectedAbility)
    }
  }

  addType(){
    const result = this.selectedTypes.find(ab => ab.id === this.selectedType.id)

    if(!result)
    {
      this.selectedTypes.push(this.selectedType)
    }
  }

}
