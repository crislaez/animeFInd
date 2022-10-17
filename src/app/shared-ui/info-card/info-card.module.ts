import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfoCardComponent } from './info-card';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    InfoCardComponent
  ],
  exports:[
    InfoCardComponent
  ]
})
export class InfoCardModule {}
