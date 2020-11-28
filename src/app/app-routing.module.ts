import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'comentario',
    loadChildren: () => import('./pages/comentario/comentario.module').then( m => m.ComentarioPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'fecha',
    loadChildren: () => import('./pages/fecha/fecha.module').then( m => m.FechaPageModule)
  },
  {
    path: 'fotos-proyecto',
    loadChildren: () => import('./pages/fotos-proyecto/fotos-proyecto.module').then( m => m.FotosProyectoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'materiales',
    loadChildren: () => import('./pages/materiales/materiales.module').then( m => m.MaterialesPageModule)
  },
  {
    path: 'ofertas',
    loadChildren: () => import('./pages/ofertas/ofertas.module').then( m => m.OfertasPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
