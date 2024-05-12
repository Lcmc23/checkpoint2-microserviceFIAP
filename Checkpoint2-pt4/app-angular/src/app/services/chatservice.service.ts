import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;
  mensagens: string[] = [];
  novaMensagem: string = "";

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:7005/chat")
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('Error Connected', err));

    this.hubConnection.on("ReceberMensagem", (mensagem: string) => {
      console.log(`Mensagem recebida: ${mensagem}`);
      this.mensagens.push(mensagem);
    });
  }

  enviarMensagem() {
    this.hubConnection.invoke('EnviarMensagem', this.novaMensagem)
      .catch(err => console.log(err));
    this.novaMensagem = "";
  }
}
