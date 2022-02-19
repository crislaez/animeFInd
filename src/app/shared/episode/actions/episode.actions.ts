import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Filter } from '../models';


export const loadEpisodes = createAction(
  '[Episode] Load Episodes',
  props<{ idAnime: string, page: number, filter?: Filter }>()
);

export const saveEpisodes = createAction(
  '[Episode] Save Episodes',
  props<{ idAnime: string, episodes: AnimeManga[], page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);
