import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAnime from '../reducers/anime.reducer';

export const selectorCardState = createFeatureSelector<fromAnime.State>(
  fromAnime.animeFeatureKey
);

export const getStatus = createSelector(
  selectorCardState,
  (state) => state?.status
);

export const getAnimeList = createSelector(
  selectorCardState,
  (state) => state?.animeList
);

export const getTotalCount = createSelector(
  selectorCardState,
  (state) => state?.totalCount
);

export const getFilters = createSelector(
  selectorCardState,
  (state) => state?.filter
)

export const getPage = createSelector(
  selectorCardState,
  (state) => state?.page
);

export const getError = createSelector(
  selectorCardState,
  (state) => state?.error
);

export const getTrendingAnimeList = createSelector(
  selectorCardState,
  (state) => state?.trendingAnimeList
);

export const getTrendingStatus = createSelector(
  selectorCardState,
  (state) => state?.trendingStatus
);
