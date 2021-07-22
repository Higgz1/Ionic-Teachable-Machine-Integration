import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TafutaaCameraPage } from './tafutaa-camera.page';

const routes: Routes = [
  {
    path: '',
    component: TafutaaCameraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TafutaaCameraPageRoutingModule {}
