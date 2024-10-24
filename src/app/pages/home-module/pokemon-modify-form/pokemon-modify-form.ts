import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Type } from "../../../interfaces/Type";
import { PokedexService } from '../../../services/pokedex.service';

@Component({
  selector: 'app-pokemon-modify-form',
  templateUrl: './pokemon-modify-form.html',
  styleUrl: './pokemon-modify-form.scss'
})
export class PokemonModifyForm implements OnInit{

  pokemonForm: FormGroup;
  selectedTypes:Type[] = []
  typesList:Type[] = []
  selectedType:Type = {id:0,name:""}

  @Input() pokemonReceived:any
  @Output() modifyPokemon:EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
    if (this.pokemonReceived) {
      this.pokemonForm.patchValue({
        name: this.pokemonReceived.name,
        level: this.pokemonReceived.level
      });

      this.loadTypes()
      this.selectedTypes = this.pokemonReceived.types
    }
  }

  constructor(private pokedexSrv:PokedexService)
  {
    this.pokemonForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      level:new FormControl({value:"",disabled:true},[Validators.required,Validators.pattern("[0-9]")])
    })
  }

  checkPokemon()
  {
    if(this.pokemonForm.valid && this.selectedTypes.length != 0)
    {
      const pokemonToModify = {
        id:this.pokemonReceived.id,
        name:this.pokemonForm.controls['name'].value,
        level:this.pokemonForm.controls['level'].value,
        types:this.selectedTypes
      }

      console.info(pokemonToModify);

      this.modifyPokemon.emit(pokemonToModify);
    }
    else{
      alert("Invalid Form");
    }
  }

  loadTypes()
  {
    const storedTypes = localStorage.getItem('Types');
    if (storedTypes) {
      this.typesList = JSON.parse(storedTypes);
    }
  }

  onTypeSelect()
  {
    const result = this.selectedTypes.find(ab => ab.id === this.selectedType.id)

    if(!result)
    {
      this.selectedTypes.push(this.selectedType)
    }
  }

  deleteType(selectedType:any){
    this.selectedTypes = this.selectedTypes.filter(t => t.id !== selectedType.id);
  }
}
