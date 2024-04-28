import { Component } from '@angular/core';
import { TarefaService } from '../../services/tarefa-service.service';
import { Tarefa } from '../../interfaces/Tarefa';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas-component.component.html',
  styleUrl: './tarefas-component.component.css'
})
export class TarefaComponent {
  tarefas: Tarefa[] = [];
  tarefaForm: FormGroup = new FormGroup([])

  constructor(private tarefaService: TarefaService, private formBuilder: FormBuilder) {
    this.tarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: [''],
      dataVencimento: ['']
    })
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inserir() {
    if (this.tarefaForm.valid) {
      const tarefaNova: Tarefa = {
        titulo: this.tarefaForm.value.titulo,
        descricao: this.tarefaForm.value.descricao,
        dataVencimento: this.tarefaForm.value.dataVencimento,
        id: this.generateRandomString(6)
      }

      this.tarefaForm.reset()
      this.tarefaService.adicionar(tarefaNova)
      alert('Tarefa adicionada com sucesso')
    }
  }

  listar(): void {
    this.tarefas = this.tarefaService.listar();
  }

  remover(id: string): void {
    this.tarefaService.remover(id)
    alert('Tarefa removida com sucesso')
  }

  ngOnInit(): void {
    this.listar();
  }

}
