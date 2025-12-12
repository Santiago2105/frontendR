import { Component } from '@angular/core';
import { ReporteDTO } from '../../models/reporteDTO';
import { CancionService } from '../../services/cancion-service';
import { ChartPoint } from '../../models/charPoint';
import { Color, ScaleType } from '@swimlane/ngx-charts'; // Importa estos tipos

@Component({
  selector: 'app-reporte01-martinez-linares',
  standalone: false,
  templateUrl: './reporte01-martinez-linares.html',
  styleUrl: './reporte01-martinez-linares.css',
})
export class Reporte01MartinezLinares {
  displayedColumns: string[] = ['nombreAlbum', 'duracionTotal'];
  dataSource: ReporteDTO[] = [];
  chartData: ChartPoint[] = [];

  // Configuración de colores para el gráfico usando tu paleta
  colorScheme: Color = {
    name: 'miPaletaExamen',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FC9726', '#FC7226', '#FCCF26', '#FCB526', '#FCE926'] // Tus colores HEX
  };

  constructor(private cancionService: CancionService) {}

  ngOnInit(): void {
    this.cancionService.getReporte().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.chartData = data.map(item => ({
            name: item.nombreAlbum,
            value: item.duracionTotal
        }));
      },
      error: (e) => console.error(e)
    });
  }
}