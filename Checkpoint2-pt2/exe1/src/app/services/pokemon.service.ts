import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl = 'http://demo5154149.mockable.io/listar-pokemons';
  pokemons: Pokemon[] = []; // Esta lista virá da API

  constructor(private http: HttpClient) { }

  listar(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonUrl) as Observable<Pokemon[]>;
  }
}


