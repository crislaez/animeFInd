import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EpisodeCardComponent } from './episode-card';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    EpisodeCardComponent
  ],
  exports:[
    EpisodeCardComponent
  ]
})
export class EpisodeCardModule {}
