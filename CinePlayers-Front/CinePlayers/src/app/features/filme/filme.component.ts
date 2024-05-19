import { Component } from '@angular/core';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent {
  filmes: Filme[] = [];

  constructor(private filmeService: FilmeService) {}

  ngOnInit() {
    this.filmeService.getFilmes().subscribe((data: Filme[]) => {
      this.filmes = data;
    });
  }
}
