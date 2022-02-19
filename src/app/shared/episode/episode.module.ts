import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from './../notification/notification.module';
import { EpisodesEffects } from './effects/episode.effects';
import * as fromEpisodes from './reducers/episode.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromEpisodes.episodeFeatureKey, fromEpisodes.reducer),
    EffectsModule.forFeature([EpisodesEffects]),
  ]
})
export class EpisodeModule { }
