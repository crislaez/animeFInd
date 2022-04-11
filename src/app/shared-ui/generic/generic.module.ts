import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChapterModule } from '@findAnime/shared/chapter/chapter.module';
import { EpisodeModule } from '@findAnime/shared/episode/episode.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { AnimeInfoComponent } from './components/anime-info.component';
import { CardModalComponent } from './components/card-modal.component';
import { InfiniteScrollChapterComponent } from './components/infinite-scroll-chapter.component';
import { ItemPopoverComponent } from './components/item-popover.component';
import { NoDataComponent } from './components/no-data.component';
import { SpinnerComponent } from './components/spinner.component';
import { SwiperComponent } from './components/swiper.component';

const COMPONENTS = [
  NoDataComponent,
  CardModalComponent,
  ItemPopoverComponent,
  SpinnerComponent,
  SwiperComponent,
  InfiniteScrollChapterComponent,
  AnimeInfoComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    EpisodeModule,
    ChapterModule,
    SwiperModule,
    TranslateModule.forChild()
  ],
  exports:[
    ...COMPONENTS
  ]
})
export class GenericModule { }
