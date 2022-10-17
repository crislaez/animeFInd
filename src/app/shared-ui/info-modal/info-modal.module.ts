import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EpisodeModule } from '@findAnime/shared/episode/episode.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EpisodeCardModule } from '../episode-card/episode-card.module';
import { InfoCardModule } from '../info-card/info-card.module';
import { ItemPopoverModule } from '../item-popover/item-popover.module';
import { NoDataModule } from '../no-data/no-data.module';
import { InfiniteScrollModule } from './../infinite-scroll/infinite-scroll.module';
import { InfoModalComponent } from './info-modal';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NoDataModule,
    EpisodeModule,
    InfoCardModule,
    EpisodeCardModule,
    ItemPopoverModule,
    InfiniteScrollModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    InfoModalComponent
  ],
  exports:[
    InfoModalComponent
  ]
})
export class InfoModalModule {}
