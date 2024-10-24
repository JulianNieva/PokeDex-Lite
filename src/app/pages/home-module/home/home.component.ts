import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/User';
import { PokedexService } from '../../../services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  currentUser!:User
  pokedex:any;
  showList:boolean = true;
  showModifyPokemonView:boolean = false;
  showPokemonView:boolean = false;
  showAddPokemonView:boolean = false;
  selectedPokemon:any
  loading:boolean = true;

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authSrv.getCurrentUser();

    this.pokedexSrv.loadPokedex();

    this.pokedex = this.pokedexSrv.getPokedex();

    this.loading = false;
  }

  constructor(private authSrv:AuthService,private router:Router,private pokedexSrv:PokedexService)
  { }

  addPokemon($event:any)
  {
    const returnResponse = this.pokedexSrv.addPokemon($event)

    if(returnResponse)
    {
      alert("Pokemon added succesfully");
      this.pokedexSrv.loadPokedex();
      this.pokedex = this.pokedexSrv.getPokedex()
      this.goBack()
    }
    else{
      alert("Something went wrong")
    }
  }

  modifyPokemon($event:any){
    const returnResponse = this.pokedexSrv.modifyPokemon($event)

    if(returnResponse)
      {
        alert("Pokemon modified succesfully");
        this.pokedexSrv.loadPokedex();
        this.pokedex = this.pokedexSrv.getPokedex()
        this.goBack()
      }
      else{
        alert("Something went wrong")
      }
  }

  showPokemonToModify($event:any){
    this.selectedPokemon = $event;
    this.showList = false;
    this.showModifyPokemonView = true;
  }

  showPokemonToView($event:any)
  {
    this.selectedPokemon = $event;
    this.showList = false;
    this.showPokemonView = true;
  }

  showPokemonToAdd()
  {
    this.showList = false;
    this.showAddPokemonView = true;
  }

  goBack()
  {
    this.selectedPokemon = null;
    this.showModifyPokemonView = false;
    this.showPokemonView = false;
    this.showAddPokemonView = false;
    this.showList = true;
  }

  logout()
  {
    const confirmation:boolean = confirm("Are you sure you wish to logout?")

    if(confirmation)
    {
      this.authSrv.logout()
      this.router.navigateByUrl("/auth");
    }
  }
}
