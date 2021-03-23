import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "./livro.model";


@Injectable({providedIn: 'root'})
export class LivroService {
    private livros: Livro[] = [];
    private listaLivroAtualizada = new Subject <Livro[]>();

    getLivros(): Livro[]{
        return [...this.livros];
    }

    adicionarLivro(id: Int32Array, titulo: string, autor: string, paginas: Int32Array){
        const livro: Livro = {
            id: id,
            titulo: titulo,
            autor: autor,
            paginas: paginas
        }
        this.livros.push(livro);
        console.log(this.livros);
        this.listaLivroAtualizada.next([...this.livros]);
    }

    getListaLivroAtualizadaObservable(){
        return this.listaLivroAtualizada.asObservable();
    }
}