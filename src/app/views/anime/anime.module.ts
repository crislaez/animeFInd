import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarruselModule } from '@findAnime/shared-ui/carrusel/carrusel.module';
import { InfiniteScrollModule } from '@findAnime/shared-ui/infinite-scroll/infinite-scroll.module';
import { InfoModalModule } from '@findAnime/shared-ui/info-modal/info-modal.module';
import { NoDataModule } from '@findAnime/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@findAnime/shared-ui/spinner/spinner.module';
import { AnimeModule } from '@findAnime/shared/anime/anime.module';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { AnimePageRoutingModule } from './anime-routing.module';
import { AnimePage } from './containers/anime.page';
import { AnimePageEffects } from './effects/anime.page.effects';

const SHARED_MODULE = [
  AnimeModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  CarruselModule,
  InfoModalModule,
  InfiniteScrollModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    EffectsModule.forFeature([AnimePageEffects]),
    AnimePageRoutingModule
  ],
  declarations: [AnimePage]
})
export class AnimePageModule {}
