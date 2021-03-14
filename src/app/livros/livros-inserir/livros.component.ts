import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent {
  id: Int32Array
  titulo: string
  autor: string
  paginas: Int32Array

  @Output() AddLivro = new EventEmitter();

  onAddLivro(event){
    const livro = {
      id : this.id,
      titulo : this.titulo,
      autor : this.autor,
      paginas : this.paginas
    }
    this.AddLivro.emit(livro);
  }
}
