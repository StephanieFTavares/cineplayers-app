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
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './features/login/login.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'filme', component: FilmeComponent, canActivate: [AuthGuard] },
  { path: 'filme/:nome', component: FilmeDetalheComponent, canActivate: [AuthGuard] },
  { path: 'gerenciar-filme', component: GerenciarFilmeComponent, canActivate: [AuthGuard] },
  { path: 'gerenciar-sala', component: GerenciarSalaCinemaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
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
    FooterComponent,
    LoginComponent,
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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(userIcon, envelopeIcon);
  }
 }
