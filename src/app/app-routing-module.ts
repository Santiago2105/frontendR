import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Reporte01MartinezLinares } from './components/reporte01-martinez-linares/reporte01-martinez-linares';
import { autorizarConsultaGuard } from './guards/autorizar-consulta-guard';

const routes: Routes = [
  {path:"", component:Login},
  {path:"login", component:Login},
  {path:"home", component:Home},
  {path: "reporte01-martinezlinares", component: Reporte01MartinezLinares, canActivate:[autorizarConsultaGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
