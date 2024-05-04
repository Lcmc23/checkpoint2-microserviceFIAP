import { Injectable } from '@angular/core';
import { Fornecedor } from '../interfaces/fornecedor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {
    private fornecedoresUrl = "http://localhost:3001/fornecedores"
    constructor(private http: HttpClient) {

    }

    //Esta lista virá da API
    fornecedores: Fornecedor[] = [];

    listar(): Observable<Fornecedor[]> {
        return this.http.get<Fornecedor[]>(this.fornecedoresUrl) as Observable<Fornecedor[]>
        //return this.fornecedores;
    }

    getById(id: string) {
        return this.http.get(`${this.fornecedoresUrl}/${id}`) as Observable<Fornecedor>
    }

    remover(id: string) {
        const fornecedor = this.fornecedores.find(f => f.id == id);

        //if(fornecedor){
        //   const index = this.fornecedores.indexOf(fornecedor);
        //   this.fornecedores.splice(index,1);
        //}
        //


        return this.http.delete(`${this.fornecedoresUrl}/${id}`)
    }

    httpHeader = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    atualizar(fornecedor: Fornecedor) {
        return this.http.put(`${this.fornecedoresUrl}/${fornecedor.id}`, fornecedor, this.httpHeader)
    }

    adicionar(fornecedor: Fornecedor) {
        return this.http.post(this.fornecedoresUrl, fornecedor, this.httpHeader)
        //this.fornecedores.push(fornecedor);
    }
}
