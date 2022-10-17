
import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createAction, props } from '@ngrx/store';
import { Stream } from '../models';


export const loadEpisodes = createAction(
  '[Episode] Load Episodes',
  props<{ idAnime: string, page: number }>()
);

export const saveEpisodes = createAction(
  '[Episode] Save Episodes',
  props<{ idAnime: string, episodes: AnimeManga[], page: number, totalCount: number, error:unknown, status:EntityStatus }>()
);



export const loadStreams = createAction(
  '[Stream] Load Streams',
  props<{ idAnime: string, url: string }>()
);

export const saveStreams = createAction(
  '[Stream] Save Streams',
  props<{ idAnime: string, streams:Stream[], error:unknown, status:EntityStatus }>()
);
