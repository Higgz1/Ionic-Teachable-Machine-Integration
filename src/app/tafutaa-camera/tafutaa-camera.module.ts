import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TafutaaCameraPageRoutingModule } from './tafutaa-camera-routing.module';

import { TafutaaCameraPage } from './tafutaa-camera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TafutaaCameraPageRoutingModule
  ],
  declarations: [TafutaaCameraPage]
})
export class TafutaaCameraPageModule {}
