import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "./livro.model";
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class LivroService {
    private livros: Livro[] = [];
    private listaLivroAtualizada = new Subject <Livro[]>();

    constructor (private httpClient: HttpClient){
    }

    getLivros(): Livro[]{

        this.httpClient.get <{mensagem: string, livros:
            Livro[]}>('http://localhost:3000/api/livros').subscribe(
                (dados) => {
                    this.livros = dados.livros;
                    this.listaLivroAtualizada.next([...this.livros])
                }
            )

        return [...this.livros];
    }

    adicionarLivro(id: Int32Array, titulo: string, autor: string, paginas: Number){
        console.log('ADIONADO VIA POST')
        const livro: Livro = {
            titulo: titulo,
            autor: autor,
            paginas: paginas
        }
        this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/livros',
            livro).subscribe(
                (dados) => {
            console.log('A SER ENVIADO: ', livro);
            this.livros.push(livro);
            this.listaLivroAtualizada.next([...this.livros]);
        })
    }

    getListaLivroAtualizadaObservable(){
        return this.listaLivroAtualizada.asObservable();
    }
}