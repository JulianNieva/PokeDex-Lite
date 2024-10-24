import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { Ability } from '../interfaces/Abilities';
import { Evolution } from '../interfaces/Evolution';
import { Type } from "../interfaces/Type";

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  pokedex:any

  constructor() { }

  loadPokedex(){
    if(!this.checkPokedexStatus())
    {
      console.log()
      this.initLocalStorage()
    }

    this.pokedex = this.generatePokedex()
  }

  getPokedex()
  {
    return this.pokedex;
  }

  generatePokedex(){
    // Obtain localstorage data
    const pokemons = JSON.parse(localStorage.getItem('Pokemons') || "[]");
    const abilities = JSON.parse(localStorage.getItem('Abilities') || "[]");
    const pokAbilities = JSON.parse(localStorage.getItem('Pok-Abilities') || "[]");
    const types = JSON.parse(localStorage.getItem('Types') || "[]");
    const pokTypes = JSON.parse(localStorage.getItem('Pok-Types') || "[]");

    // We create the pokedex
    const pokedex = pokemons.map((pokemon:Pokemon) => {
      // We get the abilities of said pokemon
      const pokemonAbilities = pokAbilities
        .filter((pa:any) => pa.pokemonId === pokemon.id)
        .map((pa:any) => {
          const ability = abilities.find((ab:any) => ab.id === pa.abilityId);
          return {
            name: ability?.name,
            description: ability?.description
          };
        });

      // We get the type of said pokemon
      const pokemonTypes = pokTypes
        .filter((pt:any) => pt.pokemonId === pokemon.id)
        .map((pt:any) => types.find((type:any) => type.id === pt.typeId));

      //We return the full pokemon details
      return {
        id:pokemon.id,
        name: pokemon.name,
        level:pokemon.levelfound,
        abilities: pokemonAbilities,
        types: pokemonTypes,
      };
    });

    return pokedex;
  }

  addPokemon(pokemon:any) :boolean
  {
    //We make sure to check the localstorage is initialized
    if(!this.checkPokedexStatus())
      return false;

    const pokemonList = JSON.parse(localStorage.getItem('Pokemons') || "[]");
    const pokAbilities = JSON.parse(localStorage.getItem('Pok-Abilities') || "[]");
    const pokTypes = JSON.parse(localStorage.getItem('Pok-Types') || "[]");

    //We get the max id from the pokemons list
    const maxPokemonId = pokemonList.length + 1;

    const pokemonToAdd:Pokemon = {
      id: maxPokemonId,
      name:pokemon.name,
      levelfound:pokemon.level
    }

    //We push the new pokemon with the new id
    pokemonList.push(pokemonToAdd)

    //We add the correct abilities relations to the list
    pokemon.abilitiesList.forEach((ability:Ability) => {
      pokAbilities.push({
        id:pokAbilities.length + 1,
        pokemonId:maxPokemonId,
        abilityId:ability.id
      })
    });

    //We add the correct types relations to the list
    pokemon.typesList.forEach((type:Type) => {
      pokTypes.push({
        id:pokTypes.length + 1,
        pokemonId:maxPokemonId,
        typeId:type.id
      })
    })

    //Save new list
    localStorage.setItem('Pokemons', JSON.stringify(pokemonList));
    localStorage.setItem('Pok-Types', JSON.stringify(pokTypes));
    localStorage.setItem('Pok-Abilities', JSON.stringify(pokAbilities));

    return true;
  }

  //Get pokemons evolution if they have one
  getPokemonEvolutionChain(pokemon:any)
  {
    const pokemonList = JSON.parse(localStorage.getItem('Pokemons') || "[]");
    const types = JSON.parse(localStorage.getItem('Types') || "[]");
    const evolutions = JSON.parse(localStorage.getItem('Evolutions') || "[]");
    const pokTypes = JSON.parse(localStorage.getItem('Pok-Types') || "[]");

    let currentPokemonId = pokemon.id;
    const evolutionChain = []

    while (true) {
      //We get the next evolution of the pokemon
      const evolution = evolutions.find((evo:Evolution) => evo.pokemonId === currentPokemonId)

      console.info(evolution)

      if(!evolution)
        break;

      // We get the evolved pokemon deatils from the pokemon list
      const evolvedPokemon = pokemonList.find((p:Pokemon) => p.id === evolution.evolvedPokemonId);
      console.info(evolution)
      if (!evolvedPokemon) {
        break;
      }
  
      // We get their evolution types
      const pokemonTypes = pokTypes
        .filter((pt:any) => pt.pokemonId === evolvedPokemon.id)
        .map((pt:any) => {
          const type = types.find((t:Type)=> t.id === pt.typeId);
          return type.name;
        });
  
      //We add the current evolution to the list
      evolutionChain.push({
        name: evolvedPokemon.name,
        types: pokemonTypes,
        level: evolution.levelEvolution
      });
  
      //We assign the id of the current evolution to search for the next one
      currentPokemonId = evolvedPokemon.id;
    }

    return evolutionChain;
  }

  initLocalStorage()
  {
    this.initPokemons();
    this.initAbilities();
    this.initEvolutions();
    this.initTypes();
    this.initRelationPokAbilities();
    this.initRelationPokTypes();
  }

  initTypes(){
    const staticTypes:Type[] = [
      {id:1 , name:"Grass"},
      {id:2 , name:"Poison"},
      {id:3 , name:"Fire"},
      {id:4 , name:"Water"},
      {id:5 , name:"Flying"},
    ]

    localStorage.setItem("Types",JSON.stringify(staticTypes))
  }

  initAbilities(){
    const staticAbilities:Ability[] = [
      {id: 1,name: 'Cut',description: 'Slash the opponent'},
      {id: 2,name: 'Tackle',description: 'Tackle the opponent'},
      {id: 3,name: 'Razor-leaf',description: 'Cast leafs that cut your enemy'},
      {id: 4,name: 'Blaze',description: 'Cast fire that damages your opponent'},
      {id: 5,name: 'Fire-punch',description: 'Punch with your ignited fist'},
      {id: 6,name: 'Torrent',description: 'Increase your DMG by 50% for 2 turns'},
      {id: 7,name: 'Swift-attack',description: 'Damage your opponent 2-5 times'},
    ]

    localStorage.setItem("Abilities",JSON.stringify(staticAbilities))
  }

  initPokemons(){
    const staticPokemons:Pokemon[] = [
      { id: 1, name: 'Bulbasaur', levelfound: 2},
      { id: 2, name: 'Ivysaur', levelfound: 15},
      { id: 3, name: 'Venusaur', levelfound: 30},
      { id: 4, name: 'Charmander', levelfound: 4},
      { id: 5, name: 'Charmeleon', levelfound: 12},
      { id: 6, name: 'Charizard', levelfound: 27},
      { id: 7, name: 'Squirtle', levelfound: 3},
      { id: 8, name: 'Wartortle', levelfound: 16},
      { id: 9, name: 'Blastoise', levelfound: 30},
    ]

    localStorage.setItem("Pokemons",JSON.stringify(staticPokemons))
  }

  initEvolutions()
  {
    const staticEvolutions:Evolution[] = [
      { pokemonId: 1,evolvedPokemonId: 2,levelEvolution: 16},
      { pokemonId: 2,evolvedPokemonId: 3,levelEvolution: 32},
      { pokemonId: 4,evolvedPokemonId: 5,levelEvolution: 16},
      { pokemonId: 5,evolvedPokemonId: 6,levelEvolution: 27},
      { pokemonId: 7,evolvedPokemonId: 8,levelEvolution: 16},
      { pokemonId: 8,evolvedPokemonId: 9,levelEvolution: 36},
    ]

    localStorage.setItem("Evolutions",JSON.stringify(staticEvolutions))
  }

  initRelationPokTypes(){
    const pokType:any = [
      {id:1,pokemonId:7,typeId:4},
      {id:2,pokemonId:8,typeId:4},
      {id:3,pokemonId:9,typeId:4},
      {id:4,pokemonId:4,typeId:3},
      {id:5,pokemonId:5,typeId:3},
      {id:6,pokemonId:6,typeId:3},
      {id:7,pokemonId:6,typeId:5},
      {id:8,pokemonId:1,typeId:1},
      {id:9,pokemonId:1,typeId:2},
      {id:10,pokemonId:2,typeId:1},
      {id:11,pokemonId:2,typeId:2},
      {id:12,pokemonId:3,typeId:1},
      {id:13,pokemonId:3,typeId:2},
    ]

    localStorage.setItem("Pok-Types",JSON.stringify(pokType))
  }

  initRelationPokAbilities(){
    const pokAbilities:any = [
      {id:1,pokemonId:1,abilityId:1},
      {id:2,pokemonId:1,abilityId:2},
      {id:3,pokemonId:2,abilityId:1},
      {id:4,pokemonId:2,abilityId:2},
      {id:5,pokemonId:3,abilityId:1},
      {id:6,pokemonId:3,abilityId:2},
      {id:7,pokemonId:3,abilityId:7},
      {id:8,pokemonId:4,abilityId:5},
      {id:9,pokemonId:4,abilityId:4},
      {id:10,pokemonId:5,abilityId:5},
      {id:11,pokemonId:5,abilityId:4},
      {id:12,pokemonId:6,abilityId:5},
      {id:13,pokemonId:6,abilityId:4},
      {id:14,pokemonId:6,abilityId:6},
      {id:15,pokemonId:7,abilityId:2},
      {id:16,pokemonId:7,abilityId:6},
      {id:17,pokemonId:8,abilityId:2},
      {id:18,pokemonId:8,abilityId:6},
      {id:19,pokemonId:9,abilityId:2},
      {id:20,pokemonId:9,abilityId:6},
      {id:21,pokemonId:9,abilityId:7},
    ]

    localStorage.setItem("Pok-Abilities",JSON.stringify(pokAbilities))
  }

  checkPokedexStatus():boolean{

    const localKeys = [
      "Pok-Abilities",
      "Pok-Types",
      "Pokemons",
      "Evolutions",
      "Types",
      "Abilities"
    ];

    return localKeys.every(key => localStorage.getItem(key) !== null);
  }
}
