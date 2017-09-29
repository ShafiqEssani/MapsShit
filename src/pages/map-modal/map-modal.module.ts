import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapModal } from './map-modal';

@NgModule({
  declarations: [
    MapModal,
  ],
  imports: [
    IonicPageModule.forChild(MapModal),
  ],
})
export class MapModalModule {}
