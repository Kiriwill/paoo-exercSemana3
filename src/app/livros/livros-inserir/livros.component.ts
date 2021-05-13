import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Livro } from '../livro.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")) {
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.livroService.getCliente(this.idLivro).subscribe(
          dadosLi => {
            this.livro = {
              id: dadosLi._id,
              autor: dadosLi.autor,
              titulo: dadosLi.titulo,
              paginas: dadosLi.paginas
            }
          }
        )
      }
      else{
        this.modo = "criar";
        this.idLivro = null;
      }
    });
  }

  constructor(public livroService: LivroService, public route: ActivatedRoute){

  }

  onSalvarLivro(form: NgForm){
    console.log(form)
    if (form.invalid) return;
    if (this.modo === "criar"){
      this.livroService.adicionarLivro(
        form.value.id,
        form.value.titulo,
        form.value.autor,
        form.value.paginas);
      
    }
    else{
      this.livroService.atualizarCliente(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.paginas
      )
    }
    form.resetForm();
  }
}
