import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createAction, props } from '@ngrx/store';
import { Filter } from '../models';


export const loadMangaList = createAction(
  '[Manga] Load MangaList',
  props<{ page: number, filter?: Filter }>()
);

export const saveMangaList = createAction(
  '[Manga] Save MangaList',
  props<{ mangaList: AnimeManga[], page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);



export const loadTrendingMangaList = createAction(
  '[Manga] Load TrendingMangaList'
);

export const saveTrendingMangaList = createAction(
  '[Manga] Save TrendingMangaList',
  props<{ mangaList: AnimeManga[], error:unknown, status:EntityStatus }>()
);



export const loadMostAnticipatedMangaList = createAction(
  '[Manga] Load Most Anticipated MangaList'
);

export const saveMostAnticipatedMangaList = createAction(
  '[Manga] Save Most Anticipated MangaList',
  props<{ mangaList: AnimeManga[], error:unknown, status:EntityStatus }>()
);



export const loadBestEvaluatedMangaList = createAction(
  '[Manga] Load Best Evaluated MangaList'
);

export const saveBestEvaluatedMangaList = createAction(
  '[Manga] Save Best Evaluated MangaList',
  props<{ mangaList: AnimeManga[], error:unknown, status:EntityStatus }>()
);



export const loadMostPopularMangaList = createAction(
  '[Manga] Load Most Popular MangaList'
);

export const saveMostPopularMangaList = createAction(
  '[Manga] Save Most Popular MangaList',
  props<{ mangaList: AnimeManga[], error:unknown, status:EntityStatus }>()
);
