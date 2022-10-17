import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
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
  '[Anime] Load Trending AnimeList'
);

export const saveTrendingAnimeList = createAction(
  '[Anime] Save Trending AnimeList',
  props<{ animeList: AnimeManga[], error:unknown, status:EntityStatus }>()
);



export const loadMostAnticipatedAnimeList = createAction(
  '[Anime] Load Most Anticipated AnimeList'
);

export const saveMostAnticipatedAnimeList = createAction(
  '[Anime] Save Most Anticipated AnimeList',
  props<{ animeList: AnimeManga[], error:unknown, status:EntityStatus }>()
);



export const loadBestEvaluatedAnimeList = createAction(
  '[Anime] Load Best Evaluated AnimeList'
);

export const saveBestEvaluatedAnimeList = createAction(
  '[Anime] Save Best Evaluated AnimeList',
  props<{ animeList: AnimeManga[], error:unknown, status:EntityStatus }>()
);



export const loadMostPopularAnimeList = createAction(
  '[Anime] Load Most Popular AnimeList'
);

export const saveMostPopularAnimeList = createAction(
  '[Anime] Save Most Popular AnimeList',
  props<{ animeList: AnimeManga[], error:unknown, status:EntityStatus }>()
);
