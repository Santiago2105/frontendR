import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MaterialModuleModule } from './material-module/material-module-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { autorizacionInterceptor } from './interceptors/autorizacion-interceptor';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Header } from './components/header/header';

@NgModule({
  declarations: [
    App,
    Login,
    Home,
    Header
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([autorizacionInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
