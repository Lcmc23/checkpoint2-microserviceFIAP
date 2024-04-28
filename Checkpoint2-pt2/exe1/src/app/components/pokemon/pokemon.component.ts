import { Component} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interface/pokemon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})


export class PokemonComponent {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  listar(): void {
    this.pokemonService.listar().subscribe((item) => (this.pokemons = item));
  }

  ngOnInit(): void {
    this.listar();
  }
}

