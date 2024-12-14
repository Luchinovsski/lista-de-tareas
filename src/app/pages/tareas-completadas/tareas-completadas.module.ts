import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasCompletadasPageRoutingModule } from './tareas-completadas-routing.module';

import { TareasCompletadasPage } from './tareas-completadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasCompletadasPageRoutingModule
  ],
  declarations: [TareasCompletadasPage]
})
export class TareasCompletadasPageModule {}
