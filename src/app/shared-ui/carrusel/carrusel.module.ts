import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CarruselComponent } from './carrusel';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    CarruselComponent
  ],
  exports:[
    CarruselComponent
  ]
})
export class CarruselModule {}
