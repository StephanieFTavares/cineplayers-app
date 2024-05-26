import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme.model';
import { Response } from '../models/response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private apiUrl = 'https://localhost:7231/Filme';

  constructor(private http: HttpClient) { }

  getFilmes(): Observable<Filme[]> {
    return this.http.get<Response>(this.apiUrl).pipe(
      map(response => response.data.map(filme => this.transformToFilme(filme)))
    );
  }

  getFilmeByName(nome: string): Observable<Filme> {
    return this.http.get<Response>(`${this.apiUrl}/${encodeURIComponent(nome)}`).pipe(
      map(response => this.transformToFilme(response.data))
    );
  }

  createFilme(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.apiUrl, filme);
  }

  updateFilme(id: string, filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(`${this.apiUrl}/${id}`, filme);
  }

  deleteFilme(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private transformToFilme(data: any): Filme {
    return {
      id: data.id,
      nome: data.nome,
      elenco: data.elenco,
      diretor: data.diretor,
      duracao: data.duracao,
      anoDeLancamento: new Date(data.anoDeLancamento),
      sinopse: data.sinopse,
      avaliacaoDosCriticos: data.avaliacaoDosCriticos,
      avaliacaoDosUsuarios: data.avaliacaoDosUsuarios,
      tag: data.tag,
      usuariosQueFavoritaram: data.usuariosQueFavoritaram,
      usuariosQueReagiram: data.usuariosQueReagiram,
      usuariosQueAvaliaram: data.usuariosQueAvaliaram,
      sessoes: data.sessoes,
      categoria: data.categoria,
      imagem: data.imagem,
    };
  }
}
