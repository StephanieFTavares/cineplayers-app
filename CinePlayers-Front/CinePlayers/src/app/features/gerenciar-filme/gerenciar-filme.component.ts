import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-gerenciar-filme',
  templateUrl: './gerenciar-filme.component.html',
  styleUrls: ['./gerenciar-filme.component.css']
})
export class GerenciarFilmeComponent {
  filmes: Filme[] = [];
  filteredFilmes: Filme[] = [];
  isModalOpen = false;
  isDeleteModalOpen = false;
  isEditing = false;
  currentFilmeForm!: FormGroup;
  filmeToDelete: Filme | null = null;

  constructor(
    private fb: FormBuilder,
    private filmeService: FilmeService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.filmeService.getFilmes().subscribe((data: Filme[]) => {
      this.filmes = data;
      console.log(this.filmes);
      this.filteredFilmes = data;
    });

    this.searchService.currentSearchTerm.subscribe(term => {
      this.filteredFilmes = this.filterFilmes(term);
    });

    this.initializeFilmeForm();
  }

  filterFilmes(term: string): Filme[] {
    return this.filmes.filter(filme =>
      filme.nome.toLowerCase().includes(term.toLowerCase()) ||
      filme.elenco.toLowerCase().includes(term.toLowerCase()) ||
      filme.diretor.toLowerCase().includes(term.toLowerCase()) ||
      filme.duracao.toLowerCase().includes(term.toLowerCase()) ||
      filme.anoDeLancamento.getFullYear().toString().includes(term) ||
      filme.sinopse.toLowerCase().includes(term.toLowerCase()) ||
      filme.avaliacaoDosCriticos.toString().includes(term) ||
      filme.avaliacaoDosUsuarios.toString().includes(term) ||
      filme.categoria.toLowerCase().includes(term.toLowerCase())
    );
  }

  initializeFilmeForm(filme: Filme = this.initializeFilme()): void {
    this.currentFilmeForm = this.fb.group({
      id: [filme.id],
      nome: [filme.nome, Validators.required],
      diretor: [filme.diretor, Validators.required],
      anoDeLancamento: [this.formatDate(filme.anoDeLancamento), Validators.required],
      duracao: [filme.duracao, Validators.required],
      sinopse: [filme.sinopse, Validators.required],
      elenco: [filme.elenco, Validators.required],
      categoria: [filme.categoria, Validators.required],
      imagem: [filme.imagem],
      tag: [filme.tag, Validators.required]
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
      sessoes: [],
      categoria: '',
      imagem: '',
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
    if (this.currentFilmeForm.valid) {
      const newFilme: Filme = this.prepareFilmeForSubmission(this.currentFilmeForm.value);
      console.log('Criando filme:', newFilme);  // Log para debug
      this.filmeService.createFilme(newFilme).subscribe(
        (createdFilme) => {
          console.log('Filme criado:', createdFilme);  // Log para debug
          this.filmes.push(createdFilme);
        },
        (error) => {
          console.error('Erro ao criar filme:', error);  // Log de erro
        }
      );
      this.closeModal();
    }
    setTimeout(() => { window.location.reload(); }, 800);
  }

  updateFilme() {
    if (this.currentFilmeForm.valid) {
      const updatedFilme: Filme = this.prepareFilmeForSubmission(this.currentFilmeForm.value);
      console.log('Atualizando filme:', updatedFilme);  // Log para debug
      this.filmeService.updateFilme(updatedFilme.id, updatedFilme).subscribe(
        (updatedFilme) => {
          console.log('Filme atualizado:', updatedFilme);  // Log para debug
          const index = this.filmes.findIndex(s => s.id === updatedFilme.id);
          if (index !== -1) {
            this.filmes[index] = updatedFilme;
          }
        },
        (error) => {
          console.error('Erro ao atualizar filme:', error);  // Log de erro
        }
      );
      this.closeModal();
    }
    setTimeout(() => { window.location.reload(); }, 500);
  }

  confirmDelete(filme: Filme) {
    this.filmeToDelete = filme;
    this.isDeleteModalOpen = true;
  }

  deleteFilme() {
    if (this.filmeToDelete) {
      this.filmeService.deleteFilme(this.filmeToDelete.id).subscribe(
        () => {
          this.filmes = this.filmes.filter(filme => filme.id !== this.filmeToDelete!.id);
          this.filteredFilmes = [...this.filmes];
        }
      );
    }
    this.isDeleteModalOpen = false;
    this.filmeToDelete = null;
    setTimeout(() => { window.location.reload(); }, 500);
  }

  cancelDelete() {
    this.isDeleteModalOpen = false;
    this.filmeToDelete = null;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  private prepareFilmeForSubmission(filme: any): Filme {
    return {
      ...filme,
      anoDeLancamento: new Date(filme.anoDeLancamento),
      tag: Number(filme.tag)
    };
  }
}
