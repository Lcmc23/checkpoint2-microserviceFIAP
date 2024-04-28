import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBGE } from '../interface/ibge';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  estados: IBGE[] = [];  // Esta lista virá da API

  constructor(private http: HttpClient) { }

  listar(): Observable<IBGE[]> {
    return this.http.get<IBGE[]>(this.apiUrl) as Observable<IBGE[]>;
  }
}


