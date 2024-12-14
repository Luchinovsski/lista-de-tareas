import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pantalla1', pathMatch: 'full' },
  {
    path: 'pantalla1',
    loadChildren: () =>
      import('./pages/pantalla1/pantalla1.module').then(
        (m) => m.Pantalla1PageModule
      ),
  },
  {
    path: 'pantalla2',
    loadChildren: () =>
      import('./pages/pantalla2/pantalla2.module').then(
        (m) => m.Pantalla2PageModule
      ),
  },
  {
    path: 'tareas',
    loadChildren: () => import('./pages/tareas/tareas.module').then( m => m.TareasPageModule)
  },
  {
    path: 'tareas-completadas',
    loadChildren: () => import('./pages/tareas-completadas/tareas-completadas.module').then( m => m.TareasCompletadasPageModule)
  },
  {
    path: 'tareas-eliminadas',
    loadChildren: () => import('./pages/tareas-eliminadas/tareas-eliminadas.module').then( m => m.TareasEliminadasPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
