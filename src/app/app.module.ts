import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";

import { AppComponent } from './app.component';
import { LivrosComponent } from './livros/livros-inserir/livros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LivrosListaComponent } from './livros/livros-lista/livros-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    LivrosComponent,
    LivrosListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }