import { Injectable } from '@angular/core';
import { ReporteDTO } from '../models/reporteDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CancionService {
  private url = 'http://localhost:8080/upc/martinez/promedios'; 

  constructor(private http: HttpClient) { }

  getReporte(): Observable<ReporteDTO[]> {
    return this.http.get<ReporteDTO[]>(this.url);
  }
}
