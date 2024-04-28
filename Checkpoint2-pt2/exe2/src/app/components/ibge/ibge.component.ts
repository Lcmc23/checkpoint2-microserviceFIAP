import { Component } from '@angular/core';
import { IbgeService } from '../../services/ibge.service';
import { IBGE } from '../../interface/ibge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ibge.component.html',
  styleUrls: ['./ibge.component.css']
})
export class IBGEListComponent {
  estados: IBGE[] = [];

  constructor(private ibgeService: IbgeService) { }

  listar(): void {
    this.ibgeService.listar().subscribe((item) => (this.estados = item));
  }

  ngOnInit(): void {
    this.listar();
  }
}

