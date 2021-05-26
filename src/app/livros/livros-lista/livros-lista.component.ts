import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent implements OnInit, OnDestroy{

  livros: Livro[] = []
  private livroSubscription: Subscription;
  totalDeLivros: number = 10;
  totalDeLivrosPorPagina: number = 2;
  opcoesTotalDeLivrosPorPagina = [2, 5, 10];

  // atalho para criar uma variavel de instancia private e a instanciar
  constructor(private livroService: LivroService) {

  }

  ngOnInit(): void {
    // posso chamar o objeto por causa do atalho acima
    this.livros = this.livroService.getLivros();
    // observo o evento se a lista mudar;
    this.livroSubscription = this.livroService.getListaLivroAtualizadaObservable().subscribe(
      (livros: Livro[]) => {
        this.livros = livros;
      }
    )
  }
  ngOnDestroy(): void{
    this.livroSubscription.unsubscribe();
  }

  onDelete (id: string): void{    this.livroService.removerLivro(id);}
}
