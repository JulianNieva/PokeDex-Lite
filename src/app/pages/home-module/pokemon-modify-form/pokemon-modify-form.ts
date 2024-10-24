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

  @Input() pokemonToModify:any
  @Output() modifyPokemon:EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
    if (this.pokemonToModify) {
      this.pokemonForm.patchValue({
        name: this.pokemonToModify.name,
        level: this.pokemonToModify.level
      });

      this.loadTypes()
      this.selectedTypes = this.pokemonToModify.types
    }
  }

  constructor(private pokedexSrv:PokedexService)
  {
    this.pokemonForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      level:new FormControl({value:"",disabled:true},[Validators.required,Validators.pattern("[0-9]")])
    })
  }

  modifiedPokemon()
  {

  }

  loadTypes()
  {
    const storedTypes = localStorage.getItem('Types');
    if (storedTypes) {
      this.typesList = JSON.parse(storedTypes);
    }
  }

  //onTypeSelect(event:any)
  //{
  //   const selectElement = event.target as HTMLSelectElement;
  //   const selectedType = this.typesList.find(type => type.id == selectElement.value);

  //   if (selectedType) {
  //     // Ya tienes el objeto completo seleccionado (id, name, etc.)
  //     console.log('Tipo seleccionado:', selectedType);
  //     // Aquí puedes manejar la selección del tipo completo
  //     this.selectedTypes.push(selectedType);  // Guardamos el objeto tipo completo
  //   }
  // }

  // deleteType(selectedType:any){
  //   console.info(selectedType)
  //   this.selectedTypes = this.selectedTypes.filter(t => t.id !== selectedType.id);
  // }
}
