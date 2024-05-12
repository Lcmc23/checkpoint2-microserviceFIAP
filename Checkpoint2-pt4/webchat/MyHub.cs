using Microsoft.AspNetCore.SignalR;

namespace webchat;

public class MyHub : Hub
{
    public async Task EnviarMensagem(string mensagem)
    {
        // Enviar a mensagem para todos os clientes conectados
        await Clients.All.SendAsync("ReceberMensagem", mensagem);
    }
}