import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChapterModule } from '@findAnime/shared/chapter/chapter.module';
import { EpisodeModule } from '@findAnime/shared/episode/episode.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardModalComponent } from './components/card-modal.component';
import { ItemPopoverComponent } from './components/item-popover.component';

@NgModule({
  declarations: [
    CardModalComponent,
    ItemPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    EpisodeModule,
    ChapterModule,
    TranslateModule.forChild()
  ],
  exports:[
    CardModalComponent,
    ItemPopoverComponent
  ]
})
export class GenericModule { }
