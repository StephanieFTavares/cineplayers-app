import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

@Component({
  selector: 'app-gerenciar-filme',
  templateUrl: './gerenciar-filme.component.html',
  styleUrls: ['./gerenciar-filme.component.css']
})
export class GerenciarFilmeComponent {
  filmes: Filme[] = [];
  isModalOpen = false;
  isEditing = false;
  currentFilmeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filmeService: FilmeService
  ) {}

  ngOnInit() {
    this.filmeService.getFilmes().subscribe((data: Filme[]) => {
      this.filmes = data;
    });
    this.initializeFilmeForm();
  }

  initializeFilmeForm(filme: Filme = this.initializeFilme()): void {
    this.currentFilmeForm = this.fb.group({
      nome: [filme.nome, Validators.required],
      diretor: [filme.diretor, Validators.required],
      anoDeLancamento: [filme.anoDeLancamento.getFullYear(), Validators.required],
      duracao: [filme.duracao, Validators.required],
      sinopse: [filme.sinopse, Validators.required],
      elenco: [filme.elenco, Validators.required]
    });
  }

  initializeFilme(): Filme {
    return {
      id: '',
      nome: '',
      elenco: '',
      diretor: '',
      duracao: '',
      anoDeLancamento: new Date(),
      sinopse: '',
      avaliacaoDosCriticos: 0,
      avaliacaoDosUsuarios: 0,
      tag: 0,
      usuariosQueFavoritaram: [],
      usuariosQueReagiram: [],
      usuariosQueAvaliaram: null,
      sessoes: []
    };
  }

  openCreateModal() {
    this.isEditing = false;
    this.initializeFilmeForm();
    this.isModalOpen = true;
  }

  openEditModal(filme: Filme) {
    this.isEditing = true;
    this.initializeFilmeForm(filme);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createFilme() {
    const newFilme = { ...this.currentFilmeForm.value, id: (this.filmes.length + 1).toString() };
    this.filmes.push(newFilme);
    this.closeModal();
  }

  updateFilme() {
    const updatedFilme = { ...this.currentFilmeForm.value };
    const index = this.filmes.findIndex(f => f.id === updatedFilme.id);
    if (index !== -1) {
      this.filmes[index] = updatedFilme;
    }
    this.closeModal();
  }

  deleteFilme(id: string) {
    this.filmes = this.filmes.filter(filme => filme.id !== id);
  }
}
