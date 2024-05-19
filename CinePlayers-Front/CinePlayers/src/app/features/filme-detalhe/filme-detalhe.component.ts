import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

@Component({
  selector: 'app-filme-detalhe',
  templateUrl: './filme-detalhe.component.html',
  styleUrls: ['./filme-detalhe.component.css']
})
export class FilmeDetalheComponent {
  filme: Filme | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmeService: FilmeService
  ) { }

  ngOnInit(): void {
    const nome = this.route.snapshot.paramMap.get('nome');
    if (nome) {
      this.filmeService.getFilmeByName(nome).subscribe(filme => {
        this.filme = filme;
      }, error => {
        console.error('Erro ao buscar filme:', error);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/filme']);
  }
}
