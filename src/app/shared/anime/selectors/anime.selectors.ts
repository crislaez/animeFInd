import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { animeListFeatureKey } from '../reducers/anime.reducer';
import { bestEvaluatedAnimeFeatureKey } from '../reducers/best-evaluated.reducer';
import { mostAnticipatedAnimeFeatureKey } from '../reducers/most-anticipated.reducer';
import { mostPopularAnimeFeatureKey } from '../reducers/most-popular.reducer';
import { trendingAnimeFeatureKey } from '../reducers/tranding.reducer';


export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);


/* === ANIMELIST === */
export const selectAnimeListState = createSelector(
  selectCombineState,
  (state) => state[animeListFeatureKey]
);


export const selectStatus = createSelector(
  selectAnimeListState,
  (state) => state?.status
);

export const selectAnimeList = createSelector(
  selectAnimeListState,
  (state) => state?.animeList
);

export const selectTotalCount = createSelector(
  selectAnimeListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectAnimeListState,
  (state) => state?.filter
)

export const selectPage = createSelector(
  selectAnimeListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectAnimeListState,
  (state) => state?.error
);



/* === TRENDING ANIME === */
export const selectTrendingAnimeState = createSelector(
  selectCombineState,
  (state) => state[trendingAnimeFeatureKey]
);


export const selectTrendingAnimeList = createSelector(
  selectTrendingAnimeState,
  (state) => state?.animeList
);

export const selectTrendingStatus = createSelector(
  selectTrendingAnimeState,
  (state) => state?.status
);



/* === MOST ANTICIPATED ANIME === */
export const selectMostAnticipatedAnimeState = createSelector(
  selectCombineState,
  (state) => state[mostAnticipatedAnimeFeatureKey]
);


export const selectMostAnticipatedAnimeList = createSelector(
  selectMostAnticipatedAnimeState,
  (state) => state?.animeList
);

export const selectMostAnticipatedStatus = createSelector(
  selectMostAnticipatedAnimeState,
  (state) => state?.status
);



/* === BEST EVALUATED ANIME === */
export const selectBestEvaluatedAnimeState = createSelector(
  selectCombineState,
  (state) => state[bestEvaluatedAnimeFeatureKey]
);


export const selectBestEvaluatedAnimeList = createSelector(
  selectBestEvaluatedAnimeState,
  (state) => state?.animeList
);

export const selectBestEvaluatedStatus = createSelector(
  selectBestEvaluatedAnimeState,
  (state) => state?.status
);



/* === TRENDING ANIME === */
export const selectMostPopularAnimeState = createSelector(
  selectCombineState,
  (state) => state[mostPopularAnimeFeatureKey]
);


export const selectMostPopularAnimeList = createSelector(
  selectMostPopularAnimeState,
  (state) => state?.animeList
);

export const selectMostPopularStatus = createSelector(
  selectMostPopularAnimeState,
  (state) => state?.status
);



