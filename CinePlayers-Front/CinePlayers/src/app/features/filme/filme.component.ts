import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent {
  filmes: Filme[] = [];
  modalOpen = false;
  selectedFilme: Filme | null = null;

  constructor(
    private router: Router,
    private filmeService: FilmeService) {}

  ngOnInit() {
    this.filmeService.getFilmes().subscribe((data: Filme[]) => {
      this.filmes = data;
    });
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
}
