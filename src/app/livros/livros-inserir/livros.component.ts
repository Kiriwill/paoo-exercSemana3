import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeTypeValidator } from 'src/app/livros/livros-inserir/mime-type-validator';
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
  form: FormGroup;
  previewImagem: string;

  ngOnInit(){
    this.form = new FormGroup({
      titulo: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      autor: new FormControl(null, {  
        validators: [Validators.required]
      }),
      paginas: new FormControl(null, {
        validators: [Validators.required]
      }),
      imagem: new FormControl(null, {
        validators:[Validators.required],
        asyncValidators: [mimeTypeValidator]
      })
    })
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
              paginas: dadosLi.paginas,
              imagemURL: dadosLi.imagemURL
            },
            this.form.setValue({
              autor: this.livro.autor,
              titulo: this.livro.titulo,
              paginas: this.livro.paginas,
              imagem: this.livro.imagemURL
            })
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

  onSalvarLivro(){
    if (this.form.invalid) return;
    if (this.modo === "criar"){
      this.livroService.adicionarLivro(
        this.form.value.id,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas,
        this.form.value.imagem);
      
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas,
        this.form.value.imagem
      )
    }
    this.form.reset();
  }

  onImagemSelecionada(event: Event){
    const arquivo = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({'imagem': arquivo});
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImagem = reader.result as string;
    }
    reader.readAsDataURL(arquivo)
  }
}
