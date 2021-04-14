import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },

  {
    path: 'tab',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [ AuthGuardService ]
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
    loadChildren: () => import('./pages/ofertas/ofertas.module').then( m => m.OfertasPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  
 
  {
    path: 'tarea',
    loadChildren: () => import('./pages/tarea/tarea.module').then( m => m.TareaPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule), canActivate: [ AuthGuardService ]
  },
 
  {
    path: 'titulo',
    loadChildren: () => import('./pages/titulo/titulo.module').then( m => m.TituloPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'horarios',
    loadChildren: () => import('./pages/horarios/horarios.module').then( m => m.HorariosPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'comentario',
    loadChildren: () => import('./pages/comentario/comentario.module').then( m => m.ComentarioPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'foto',
    loadChildren: () => import('./pages/foto/foto.module').then( m => m.FotoPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'contratados',
    loadChildren: () => import('./pages/contratados/contratados.module').then( m => m.ContratadosPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule), canActivate: [ AuthGuardService ]
  },
  
  {
    path: 'detallemapa',
    loadChildren: () => import('./pages/detallemapa/detallemapa.module').then( m => m.DetallemapaPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'regismapa',
    loadChildren: () => import('./pages/regismapa/regismapa.module').then( m => m.RegismapaPageModule)
  },
  {
    path: 'datospersonales',
    loadChildren: () => import('./pages/datospersonales/datospersonales.module').then( m => m.DatospersonalesPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'factura',
    loadChildren: () => import('./pages/factura/factura.module').then( m => m.FacturaPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'maparesumen',
    loadChildren: () => import('./pages/maparesumen/maparesumen.module').then( m => m.MaparesumenPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'aceptarregistro',
    loadChildren: () => import('./pages/aceptarregistro/aceptarregistro.module').then( m => m.AceptarregistroPageModule)
  },
  {
    path: 'imagenmodal',
    loadChildren: () => import('./pages/imagenmodal/imagenmodal.module').then( m => m.ImagenmodalPageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'histdetalle',
    loadChildren: () => import('./pages/histdetalle/histdetalle.module').then( m => m.HistdetallePageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'contrase',
    loadChildren: () => import('./pages/contrase/contrase.module').then( m => m.ContrasePageModule), canActivate: [ AuthGuardService ]
  },
  {
    path: 'contrasolvida',
    loadChildren: () => import('./pages/contrasolvida/contrasolvida.module').then( m => m.ContrasolvidaPageModule)
  },
  {
    path: 'option',
    loadChildren: () => import('./pages/option/option.module').then( m => m.OptionPageModule)
  },
  {
    path: 'materiales',
    loadChildren: () => import('./pages/materiales/materiales.module').then( m => m.MaterialesPageModule)
  },


 








];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
