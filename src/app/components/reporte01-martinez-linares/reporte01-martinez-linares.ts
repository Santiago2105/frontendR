import { Component } from '@angular/core';
import { ReporteDTO } from '../../models/reporteDTO';
import { CancionService } from '../../services/cancion-service';
import { ChartPoint } from '../../models/charPoint';

@Component({
  selector: 'app-reporte01-martinez-linares',
  standalone: false,
  templateUrl: './reporte01-martinez-linares.html',
  styleUrl: './reporte01-martinez-linares.css',
})
export class Reporte01MartinezLinares {
displayedColumns: string[] = ['nombreAlbum', 'duracionTotal'];
  dataSource: ReporteDTO[] = [];

  // Gráfico (Simple, como tu profesor)
  chartData: ChartPoint[] = []; 

  constructor(private cancionService: CancionService) {}

  ngOnInit(): void {
    this.cancionService.getReporte().subscribe({
      next: (data) => {
        this.dataSource = data;

        // Convertir datos para el gráfico
        this.chartData = data.map(item => ({
            name: item.nombreAlbum,
            value: item.duracionTotal
        }));
      },
      error: (e) => console.error(e)
    });
  }
}
