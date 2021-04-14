import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent {

  constructor(private livroService: LivroService){

  }

  onAddLivro(form: NgForm){
    console.log(form)

    if (form.invalid) return;
    this.livroService.adicionarLivro(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.paginas);
    form.resetForm();
    }
}
