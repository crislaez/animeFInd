import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEpisode from '../reducers/episode.reducer';

export const selectorEpisodeState = createFeatureSelector<fromEpisode.State>(
  fromEpisode.episodeFeatureKey
);

export const getStatus = createSelector(
  selectorEpisodeState,
  (state) => state?.status
);

export const getEpisodes = createSelector(
  selectorEpisodeState,
  (state) => state?.episodes
);

export const getTotalCount = createSelector(
  selectorEpisodeState,
  (state) => state?.totalCount
);

export const getFilters = createSelector(
  selectorEpisodeState,
  (state) => state?.filter
)

export const getPage = createSelector(
  selectorEpisodeState,
  (state) => state?.page
);

export const getError = createSelector(
  selectorEpisodeState,
  (state) => state?.error
);

export const getIdAnime = createSelector(
  selectorEpisodeState,
  (state) => state?.idAnime
);

