import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaCinema } from 'src/app/core/models/sala-cinema';
import { SalaCinemaService } from 'src/app/core/services/sala-cinema.service';

@Component({
  selector: 'app-gerenciar-sala-cinema',
  templateUrl: './gerenciar-sala-cinema.component.html',
  styleUrls: ['./gerenciar-sala-cinema.component.css']
})
export class GerenciarSalaCinemaComponent {
  salas: SalaCinema[] = [];
  isModalOpen = false;
  isEditing = false;
  currentSalaForm: FormGroup;

  constructor(
    private salaCinemaService: SalaCinemaService,
    private fb: FormBuilder
  ) {
    this.currentSalaForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      capacidade: [0, Validators.required],
      sessoes: [[]]
    });
  }

  ngOnInit(): void {
    this.salaCinemaService.getSalasCinema().subscribe(
      (salas) => this.salas = salas,
      (error) => console.error('Erro ao buscar salas de cinema:', error)
    );
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentSalaForm.reset({ sessoes: [] });
    this.isModalOpen = true;
  }

  openEditModal(sala: SalaCinema) {
    this.isEditing = true;
    this.currentSalaForm.patchValue(sala);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createSala() {
    const newSala: SalaCinema = this.currentSalaForm.value;
    this.salas.push(newSala);
    this.closeModal();
  }

  updateSala() {
    const updatedSala: SalaCinema = this.currentSalaForm.value;
    const index = this.salas.findIndex(s => s.id === updatedSala.id);
    if (index !== -1) {
      this.salas[index] = updatedSala;
    }
    this.closeModal();
  }

  deleteSala(id: string) {
    this.salas = this.salas.filter(sala => sala.id !== id);
  }
}
