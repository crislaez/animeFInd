import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from './../notification/notification.module';
import { AnimeEffects } from './effects/anime.effects';
import { combineFeatureKey, reducer } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(combineFeatureKey, reducer),
    EffectsModule.forFeature([AnimeEffects]),
  ]
})
export class AnimeModule { }
