import { Injectable } from '@angular/core';
import { Client } from '../interfaces/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  //Essa lista virá da API
  clientes:Client[]=[
    {id: "1", nome: "Lucas Cabral"},
    {id: "2", nome: "João Rossi", telefone: "2345678"}
   
  ]

  listar():Client[]{
    return this.clientes;
  }

  remover(id:string){
    const client = this.clientes.find(c => c.id == id);

    if(client){
      const index = this.clientes.indexOf(client);
      this.clientes.splice(index,1); //remover o primeiro que ele encontrar
    }

  }

  adicionar(client:Client){
    this.clientes.push(client);
  }

}
