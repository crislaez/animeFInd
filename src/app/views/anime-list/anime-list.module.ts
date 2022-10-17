import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterModalModule } from '@findAnime/shared-ui/filter-modal/filter-modal.module';
import { InfiniteScrollModule } from '@findAnime/shared-ui/infinite-scroll/infinite-scroll.module';
import { InfoModalModule } from '@findAnime/shared-ui/info-modal/info-modal.module';
import { ItemListModule } from '@findAnime/shared-ui/item-list/item-list.module';
import { NoDataModule } from '@findAnime/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@findAnime/shared-ui/spinner/spinner.module';
import { AnimeModule } from '@findAnime/shared/anime/anime.module';
import { CategoryModule } from '@findAnime/shared/category/category.module';
import { SharedModule } from '@findAnime/shared/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { AnimeListPageRoutingModule } from './anime-list-routing.module';
import { AnimeListPage } from './containers/anime-list.page';
import { AnimeListPageEffects } from './effects/anime-list.effects';

const SHARED_MODULE = [
  AnimeModule,
  SharedModule,
  CategoryModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  ItemListModule,
  InfoModalModule,
  FilterModalModule,
  InfiniteScrollModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    EffectsModule.forFeature([AnimeListPageEffects]),
    AnimeListPageRoutingModule
  ],
  declarations: [AnimeListPage]
})
export class AnimeListPageModule {}
