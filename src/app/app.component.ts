import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { TarefaComponent } from './components/tarefas-component/tarefas-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientComponent, TarefaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'introduction-service';
}
