import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent {

  @Input() livros = []
}
