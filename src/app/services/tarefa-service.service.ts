import { Injectable } from '@angular/core';
import { Tarefa } from '../interfaces/Tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  // Essa lista virá da API
  tarefas: Tarefa[] = [
    { id: "1", titulo: "Tarefa 1", descricao: "Teste 1", dataVencimento: "23/10/2024"},
    { id: "2", titulo: "Tarefa 2", descricao: "Teste 2", dataVencimento: "23/10/2023" },
  ]

  listar(): Tarefa[] {
    return this.tarefas;
  }

  remover(id: string) {
    const tarefa = this.tarefas.find(t => t.id == id);

    if (tarefa) {
      const index = this.tarefas.indexOf(tarefa);
      this.tarefas.splice(index, 1); //remover a primeira que ele encontrar
    }

  }

  adicionar(tarefa: Tarefa) {
    this.tarefas.push(tarefa);
  }

}

