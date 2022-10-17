import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { MangaListPage } from './containers/manga-list.page';
import { MangaListPageEffects } from './effects/manga-list.effects';
import { MangaListPageRoutingModule } from './manga-list-routing.module';

const SHARED_MODULE = [
  MangaModule,
  SharedModule,
  CategoryModule,
];

const SHARED_UI_MODULE = [
  NoDataModule,
  SpinnerModule,
  ItemListModule,
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
    EffectsModule.forFeature([MangaListPageEffects]),
    MangaListPageRoutingModule
  ],
  declarations: [MangaListPage]
})
export class MangaListPageModule {}
