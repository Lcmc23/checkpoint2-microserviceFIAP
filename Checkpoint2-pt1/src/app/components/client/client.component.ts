import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/Client';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clientes:Client[] = [];
  clientForm: FormGroup = new FormGroup([])

  constructor(private clientService:ClientService, private formBuilder: FormBuilder){
    this.clientForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
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

  inserir(){
    if (this.clientForm.valid){
      const clientNovo: Client = {
        nome: this.clientForm.value.nome,
        telefone: this.clientForm.value.telefone,
        id: this.generateRandomString(6)
      }

      this.clientForm.reset()
      this.clientService.adicionar(clientNovo)
      alert('Cadastrado com sucesso')
    }
  }

  listar():void{
    this.clientes = this.clientService.listar();
  }

  remover(id:string):void{
    this.clientService.remover(id)
    alert('Removido com sucesso')
  }

  ngOnInit():void{
    this.listar();
  }

}
