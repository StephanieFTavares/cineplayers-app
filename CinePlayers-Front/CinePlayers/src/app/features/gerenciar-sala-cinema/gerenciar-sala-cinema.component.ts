import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaCinema } from 'src/app/core/models/sala-cinema';
import { SalaCinemaService } from 'src/app/core/services/sala-cinema.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-gerenciar-sala-cinema',
  templateUrl: './gerenciar-sala-cinema.component.html',
  styleUrls: ['./gerenciar-sala-cinema.component.css']
})
export class GerenciarSalaCinemaComponent {
  salas: SalaCinema[] = [];
  filteredSalas: SalaCinema[] = [];
  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditing = false;
  currentSalaForm: FormGroup;
  salaToDelete: SalaCinema | null = null;

  constructor(
    private salaCinemaService: SalaCinemaService,
    private fb: FormBuilder,
    private searchService: SearchService
  ) {
    this.currentSalaForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      capacidade: [0, Validators.required],
      sessoes: [[]]
    });
  }

  ngOnInit(): void {
    this.salaCinemaService.getSalasCinema().subscribe((data: SalaCinema[]) => {
      this.salas = data;
      this.filteredSalas = data;
    });

    this.searchService.currentSearchTerm.subscribe(term => {
      this.filteredSalas = this.filterSalas(term);
    });
  }

  filterSalas(term: string): SalaCinema[] {
    return this.salas.filter(sala =>
      sala.nome.toLowerCase().includes(term.toLowerCase()) ||
      sala.capacidade.toString().toLowerCase().includes(term)
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
    if (this.currentSalaForm.valid) {
      const newSala: SalaCinema = this.currentSalaForm.value;
      this.salaCinemaService.createSalaCinema(newSala).subscribe(
        (createdSala) => {
          this.salas.push(createdSala);
        }
      );
    }
    setTimeout(() => { window.location.reload(); }, 500);
    this.closeModal();
  }

  updateSala() {
    if (this.currentSalaForm.valid) {
      const updatedSala: SalaCinema = this.currentSalaForm.value;
      this.salaCinemaService.updateSalaCinema(updatedSala.id, updatedSala).subscribe(
        (updatedSala) => {
          const index = this.salas.findIndex(s => s.id === updatedSala.id);
          if (index !== -1) {
            this.salas[index] = updatedSala;
          }
        }
      );
      setTimeout(() => { window.location.reload(); }, 250);
      this.closeModal();
    }
  }

  confirmDelete(sala: SalaCinema) {
    this.salaToDelete = sala;
    this.isDeleteModalOpen = true;
  }

  deleteSala() {
    if (this.salaToDelete) {
      this.salaCinemaService.deleteSalaCinema(this.salaToDelete.id).subscribe(
        () => {
          this.salas = this.salas.filter(sala => sala.id !== this.salaToDelete!.id);
          this.filteredSalas = [...this.salas];
        }
      );
    }
    setTimeout(() => { window.location.reload(); }, 150);
    this.isDeleteModalOpen = false;
    this.salaToDelete = null;
  }

  cancelDelete() {
    this.isDeleteModalOpen = false;
    this.salaToDelete = null;
  }
}
