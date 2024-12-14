import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pantalla1PageRoutingModule } from './pantalla1-routing.module';

import { Pantalla1Page } from './pantalla1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pantalla1PageRoutingModule
  ],
  declarations: [Pantalla1Page]
})
export class Pantalla1PageModule {}
