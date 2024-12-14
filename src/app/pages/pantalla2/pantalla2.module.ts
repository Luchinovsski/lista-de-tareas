import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pantalla2PageRoutingModule } from './pantalla2-routing.module';
import { Pantalla2Page } from './pantalla2.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Pantalla2PageRoutingModule],
  declarations: [Pantalla2Page],
})
export class Pantalla2PageModule {}
