import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromManga from '../reducers/manga.reducer';

export const selectorMangaState = createFeatureSelector<fromManga.State>(
  fromManga.mangaFeatureKey
);

export const getStatus = createSelector(
  selectorMangaState,
  (state) => state?.status
);

export const getMangaList = createSelector(
  selectorMangaState,
  (state) => state?.mangaList
);

export const getTotalCount = createSelector(
  selectorMangaState,
  (state) => state?.totalCount
);

export const getFilters = createSelector(
  selectorMangaState,
  (state) => state?.filter
)

export const getPage = createSelector(
  selectorMangaState,
  (state) => state?.page
);

export const getError = createSelector(
  selectorMangaState,
  (state) => state?.error
);

export const getTrendingMangaList = createSelector(
  selectorMangaState,
  (state) => state?.trendingMangaList
);

export const getTrendingStatus = createSelector(
  selectorMangaState,
  (state) => state?.trendingStatus
);


