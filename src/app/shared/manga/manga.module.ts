import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from './../notification/notification.module';
import { MangaEffects } from './effects/manga.effects';
import * as fromManga from './reducers/manga.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromManga.mangaFeatureKey, fromManga.reducer),
    EffectsModule.forFeature([MangaEffects]),
  ]
})
export class MangaModule { }
