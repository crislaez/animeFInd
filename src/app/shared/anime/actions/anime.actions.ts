import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Filter } from '../models';


export const loadAnimeList = createAction(
  '[Anime] Load AnimeList',
  props<{ page: number, filter?: Filter }>()
);

export const saveAnimeList = createAction(
  '[Anime] Save AnimeList',
  props<{ animeList: AnimeManga[], page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);



export const loadTrendingAnimeList = createAction(
  '[Anime] Load TrendingAnimeList'
);

export const saveTrendingAnimeList = createAction(
  '[Anime] Save TrendingAnimeList',
  props<{ trendingAnimeList: AnimeManga[], error:unknown, status:EntityStatus }>()
);
