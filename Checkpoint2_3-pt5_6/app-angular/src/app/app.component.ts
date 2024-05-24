import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'app-angular';
  usuarios: any[] = [];
  usuario: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios(): void {
    this.http.get('http://localhost:5002/Usuario').subscribe(
      data => {
        this.usuarios = data as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  addUsuario(): void {
    this.http.post('http://localhost:5002/Usuario', this.usuario).subscribe(
      response => {
        console.log(response);
        this.getAllUsuarios();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUsuario(): void {
    this.http.put('http://localhost:5002/Usuario', this.usuario).subscribe(
      response => {
        console.log(response);
        this.getAllUsuarios();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUsuario(id: number): void {
    this.http.delete(`http://localhost:5002/Usuario/${id}`).subscribe(
      response => {
        console.log(response);
        this.getAllUsuarios();
      },
      error => {
        console.log(error);
      }
    );
  }
}
