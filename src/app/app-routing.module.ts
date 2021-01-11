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
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'ofertas',
    loadChildren: () => import('./pages/ofertas/ofertas.module').then( m => m.OfertasPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  
 
  {
    path: 'tarea',
    loadChildren: () => import('./pages/tarea/tarea.module').then( m => m.TareaPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
 
  {
    path: 'titulo',
    loadChildren: () => import('./pages/titulo/titulo.module').then( m => m.TituloPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./pages/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'comentario',
    loadChildren: () => import('./pages/comentario/comentario.module').then( m => m.ComentarioPageModule)
  },
  {
    path: 'foto',
    loadChildren: () => import('./pages/foto/foto.module').then( m => m.FotoPageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule)
  },  {
    path: 'contratados',
    loadChildren: () => import('./pages/contratados/contratados.module').then( m => m.ContratadosPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'dialogo',
    loadChildren: () => import('./pages/dialogo/dialogo.module').then( m => m.DialogoPageModule)
  },
  {
    path: 'detallemapa',
    loadChildren: () => import('./pages/detallemapa/detallemapa.module').then( m => m.DetallemapaPageModule)
  },
  {
    path: 'regismapa',
    loadChildren: () => import('./pages/regismapa/regismapa.module').then( m => m.RegismapaPageModule)
  }







];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
