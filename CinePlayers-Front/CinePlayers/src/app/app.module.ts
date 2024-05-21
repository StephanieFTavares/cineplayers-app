import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, envelopeIcon } from '@cds/core/icon';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './features/index/index.component';
import { FormUsuarioComponent } from './shared/components/form-usuario/form-usuario.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormFilmeComponent } from './shared/components/form-filme/form-filme.component';
import { FormSessaoComponent } from './shared/components/form-sessao/form-sessao.component';
import { FormSalaComponent } from './shared/components/form-sala/form-sala.component';
import { FilmeComponent } from './features/filme/filme.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmeDetalheComponent } from './features/filme-detalhe/filme-detalhe.component';
import { GerenciarFilmeComponent } from './features/gerenciar-filme/gerenciar-filme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerenciarSalaCinemaComponent } from './features/gerenciar-sala-cinema/gerenciar-sala-cinema.component';
import { LimitPipe } from './shared/pipes/limit.pipe';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'filme', component: FilmeComponent},
  { path: 'filme/:nome', component: FilmeDetalheComponent},
  { path: 'gerenciar-filme', component: GerenciarFilmeComponent},
  { path: 'gerenciar-sala', component: GerenciarSalaCinemaComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FormUsuarioComponent,
    NavbarComponent,
    FormFilmeComponent,
    FormSessaoComponent,
    FormSalaComponent,
    FilmeComponent,
    FilmeDetalheComponent,
    GerenciarFilmeComponent,
    GerenciarSalaCinemaComponent,
    LimitPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(userIcon, envelopeIcon);
  }
 }
