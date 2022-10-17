import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarruselModule } from '@findAnime/shared-ui/carrusel/carrusel.module';
import { FilterModalModule } from '@findAnime/shared-ui/filter-modal/filter-modal.module';
import { InfiniteScrollModule } from '@findAnime/shared-ui/infinite-scroll/infinite-scroll.module';
import { InfoModalModule } from '@findAnime/shared-ui/info-modal/info-modal.module';
import { ItemListModule } from '@findAnime/shared-ui/item-list/item-list.module';
import { NoDataModule } from '@findAnime/shared-ui/no-data/no-data.module';
import { SpinnerModule } from '@findAnime/shared-ui/spinner/spinner.module';
import { CategoryModule } from '@findAnime/shared/category/category.module';
import { MangaModule } from '@findAnime/shared/manga/manga.module';
import { SharedModule } from '@findAnime/shared/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { MangaPage } from './containers/manga.page';
import { MangaPageEffects } from './effects/manga.page.effects';
import { MangaPageRoutingModule } from './manga-routing.module';

const SHARED_MODULE = [
  MangaModule,
  SharedModule,
  CategoryModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  ItemListModule,
  CarruselModule,
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
    EffectsModule.forFeature([MangaPageEffects]),
    MangaPageRoutingModule
  ],
  declarations: [MangaPage]
})
export class MangaPageModule {}
