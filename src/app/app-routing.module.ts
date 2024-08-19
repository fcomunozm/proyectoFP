import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatmanComponent } from './components/comics/batman/batman.component';
import { ContactComponent } from './components/contact/contact.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { path: 'home', component: BatmanComponent },
  { path: 'serie-:serie', component: BatmanComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },


  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
