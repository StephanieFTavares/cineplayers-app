import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, envelopeIcon } from '@cds/core/icon';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './features/index/index.component';
import { SalaCinemaComponent } from './features/sala-cinema/sala-cinema.component';
import { FormUsuarioComponent } from './shared/components/form-usuario/form-usuario.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormFilmeComponent } from './shared/components/form-filme/form-filme.component';
import { FormSessaoComponent } from './shared/components/form-sessao/form-sessao.component';
import { FormSalaComponent } from './shared/components/form-sala/form-sala.component';
import { FilmeComponent } from './features/filme/filme.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'sala-cinema', component: SalaCinemaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SalaCinemaComponent,
    FormUsuarioComponent,
    NavbarComponent,
    FormFilmeComponent,
    FormSessaoComponent,
    FormSalaComponent,
    FilmeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
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
