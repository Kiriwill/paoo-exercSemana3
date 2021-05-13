import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LivrosListaComponent } from "src/app/livros/livros-lista/livros-lista.component";
import { LivrosComponent } from "src/app/livros/livros-inserir/livros.component";


const routes: Routes = [
    {path: '', component: LivrosListaComponent},
    {path: 'criar', component: LivrosComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class ApppRoutingModule{
    
}