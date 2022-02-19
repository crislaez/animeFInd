import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
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
  props<{ trendingMangaList: AnimeManga[], error:unknown, status:EntityStatus }>()
);
