import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasEliminadasPageRoutingModule } from './tareas-eliminadas-routing.module';

import { TareasEliminadasPage } from './tareas-eliminadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasEliminadasPageRoutingModule
  ],
  declarations: [TareasEliminadasPage]
})
export class TareasEliminadasPageModule {}
