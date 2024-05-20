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
  private apiUrl = 'https://localhost:7231/SalaCinema';

  constructor(private http: HttpClient) { }

  getSalasCinema(): Observable<SalaCinema[]> {
    return this.http.get<Response>(this.apiUrl).pipe(
      map(response => response.data.map(sala => this.transformToSalaCinema(sala)))
    );
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
