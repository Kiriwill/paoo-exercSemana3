import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";

import { AppComponent } from './app.component';
import { LivrosComponent } from './livros/livros-inserir/livros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LivrosListaComponent } from './livros/livros-lista/livros-lista.component';
import { ApppRoutingModule } from './app-routing.module';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosComponent,
    LivrosListaComponent,
    CabecalhoComponent
  ],
  imports: [
    BrowserModule,
    ApppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  //  providers: [LivroService], -> substitui @Injectable(...)
  bootstrap: [AppComponent]
})
export class AppModule { }
