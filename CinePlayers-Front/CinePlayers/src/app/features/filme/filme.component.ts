import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

interface FilmesPorCategoria {
  [categoria: string]: Filme[];
}

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent {
  filmes: Filme[] = [];
  filmesPorCategoria: FilmesPorCategoria = {};
  filmeLimites: { [categoria: string]: number } = {};
  modalOpen = false;
  selectedFilme: Filme | null = null;

  constructor(
    private router: Router,
    private filmeService: FilmeService) {}

  ngOnInit() {
    this.filmeService.getFilmes().subscribe((data: Filme[]) => {
      this.filmes = data;
      console.log(this.filmes);
      this.agruparFilmesPorCategoria();
    });
  }

  agruparFilmesPorCategoria() {
    this.filmesPorCategoria = this.filmes.reduce<FilmesPorCategoria>((acc, filme) => {
      if (!acc[filme.categoria.trim()]) {
        acc[filme.categoria.trim()] = [];
        this.filmeLimites[filme.categoria.trim()] = 4; // Limite inicial de filmes exibidos por categoria
      }
      acc[filme.categoria.trim()].push(filme);
      return acc;
    }, {});
  }

  openModal(filme: Filme) {
    this.selectedFilme = filme;
    this.modalOpen = true;
  }

  goToDetails(nome: string | undefined): void {
    if (nome) {
      this.router.navigate(['/filme', nome]);
    }
  }

  verMais(categoria: string) {
    this.filmeLimites[categoria] += 16; // Aumenta o limite em 4 filmes
  }
}
