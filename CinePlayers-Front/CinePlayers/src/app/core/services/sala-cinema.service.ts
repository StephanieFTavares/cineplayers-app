import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaCinema } from '../models/sala-cinema';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalaCinemaService {
  private apiUrl = 'http://localhost:5220/SalaCinema';

  constructor(private http: HttpClient) { }

  getSalasCinema(): Observable<SalaCinema[]> {
    return this.http.get<Response>(this.apiUrl).pipe(
      map(response => response.data.map(sala => this.transformToSalaCinema(sala)))
    );
  }

  createSalaCinema(sala: SalaCinema): Observable<SalaCinema> {
    return this.http.post<SalaCinema>(this.apiUrl, sala);
  }

  updateSalaCinema(id: string, sala: SalaCinema): Observable<SalaCinema> {
    return this.http.put<SalaCinema>(`${this.apiUrl}/${id}`, sala);
  }

  deleteSalaCinema(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private transformToSalaCinema(data: any): SalaCinema {
    return {
      id: data.id,
      nome: data.nome,
      capacidade: data.capacidade,
      sessoes: data.sessoes
    };
  }
}
