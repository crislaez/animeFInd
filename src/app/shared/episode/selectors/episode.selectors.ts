import { createFeatureSelector, createSelector } from '@ngrx/store';
import { episodeFeatureKey } from '../reducers/episode.reducer';
import { streamFeatureKey } from '../reducers/stream.reducers';
import { combineFeatureKey, CombineState } from '../reducers';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

// export const selectorEpisodeState = createFeatureSelector<fromEpisode.State>(
//   fromEpisode.episodeFeatureKey
// );


/* === EPISODES === */
export const selectEpisodeState = createSelector(
  selectCombineState,
  (state) => state[episodeFeatureKey]
);


export const selectError = createSelector(
  selectEpisodeState,
  (state) => state?.error
);

export const selectAllAnimes = createSelector(
  selectEpisodeState,
  (state) => state?.animes
);

export const selectAnimeSelected = (idAnime: string) => createSelector(
  selectAllAnimes,
  (animes) => animes?.[idAnime]
);

export const selectAnimeSelectedEpisodes = (idAnime: string) => createSelector(
  selectAllAnimes,
  (animes) => animes?.[idAnime]?.episodes
);

export const selectAnimeSelectedStatus = (idAnime: string) => createSelector(
  selectAllAnimes,
  (animes) => animes?.[idAnime]?.status
);

export const selectAnimeSelectedPage = (idAnime: string) => createSelector(
  selectAllAnimes,
  (animes) => animes?.[idAnime]?.page
);

export const selectAnimeSelectedTotalCount = (idAnime: string) => createSelector(
  selectAllAnimes,
  (animes) => animes?.[idAnime]?.totalCount
);



/* === URLS === */
export const selectStreamState = createSelector(
  selectCombineState,
  (state) => state[streamFeatureKey]
);


export const selectStreamError = createSelector(
  selectStreamState,
  (state) => state?.error
);

export const selectStreamLink = createSelector(
  selectStreamState,
  (state) => state?.links
);

export const selectStreamLinkStatus = (idAnime:string) => createSelector(
  selectStreamLink,
  (links) => links?.[idAnime]?.status
);

export const selectStreamLinkStreams = (idAnime:string) => createSelector(
  selectStreamLink,
  (links) => links?.[idAnime]?.streams
);


