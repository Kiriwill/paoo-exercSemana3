import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Livro } from "./livro.model";
import { HttpClient } from '@angular/common/http';
import { _DisposeViewRepeaterStrategy } from "@angular/cdk/collections";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LivroService {
    private livros: Livro[] = [];
    private listaLivroAtualizada = new Subject <Livro[]>();

    constructor (private httpClient: HttpClient){
    }

    getLivros(): Livro[]{
        this.httpClient.get <{mensagem: string, livros:any}>('http://localhost:3000/api/livros')
            .pipe(map((dados) => {
                return dados.livros.map(livro => {
                    return {
                        id: livro._id,
                        titulo: livro.titulo,
                        autor: livro.autor,
                        paginas: livro.paginas,
                        imagemURL: livro.imagemURL
                    }
                })
            }))
            .subscribe(
                (livros) => {
                    this.livros = livros
                    this.listaLivroAtualizada.next([...this.livros])
                }
            )

        return [...this.livros];
    }

    adicionarLivro(id: Int32Array, titulo: string, autor: string, paginas: string, imagem: File){
        console.log('ADIONADO VIA POST')
        // const livro: Livro = {
        //     id: null,
        //     titulo: titulo,
        //     autor: autor,
        //     paginas: paginas
        // }
        const dadosLivro = new FormData();
        dadosLivro.append("titulo", titulo);
        dadosLivro.append("autor", autor);
        dadosLivro.append("paginas", paginas);
        dadosLivro.append("imagem", imagem);

        this.httpClient.post<{mensagem: string, livro:Livro }>
        ('http://localhost:3000/api/livros', dadosLivro).subscribe(
                (dados) => {
                // livro.id = dados.id;
                    const livro: Livro = {
                        id: dados.livro.id,
                        titulo: titulo,
                        autor: autor,
                        paginas: paginas,
                        imagemURL: dados.livro.imagemURL
                    }
        })
    }

    getListaLivroAtualizadaObservable(){
        return this.listaLivroAtualizada.asObservable();
    }

    removerLivro(id: string): void{
        this.httpClient.delete(`http://localhost:3000/api/livros/${id}`)
        .subscribe(() => {
            this.livros = this.livros.filter((cli) => {
                return cli.id !== id
            });
            this.listaLivroAtualizada.next([...this.livros]);
        });
    }

    getCliente(idLivro: string) {
        // return {...this.livros.find((li) => li.id === idLivro)};
        return this.httpClient.get<{
            _id: string, titulo: string, autor: string, paginas: string, imagemURL: string
        }>(`http://localhost:3000/api/livros/${idLivro}`);
    }

    atualizarLivro(id: string, titulo: string, autor: string, paginas: string, imagem: File|string){
        // const livro: Livro = { id, titulo, autor, paginas, imagemURL:null};
        let livroData: Livro | FormData ;
        if (typeof(imagem) === 'object'){   //é um arquivo, montar um form data
            livroData = new FormData();
            livroData.append("id", id);
            livroData.append('titulo', titulo);
            livroData.append('autor', autor);
            livroData.append("paginas", paginas);
            livroData.append('imagem', imagem, titulo);//chave, foto e nome para o arquivo
        } else {
            //enviar JSON comum
            livroData = {
                id: id,
                titulo: titulo,
                autor: autor,
                paginas: paginas,
                imagemURL: imagem
            }
        }
        console.log (typeof(livroData));
        this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livroData)
        .subscribe(((res => {
            const copia = [...this.livros];
            const indice = copia.findIndex(cli => cli.id === id);
            const livro: Livro = {
                id: id,
                titulo: titulo,
                autor: autor,
                paginas: paginas,
                imagemURL: ""
            }
            copia[indice] = livro;
            this.livros = copia;
            this.listaLivroAtualizada.next([...this.livros]);
        })));
    }
}