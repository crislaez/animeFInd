import { createFeatureSelector, createSelector } from '@ngrx/store';
import { combineFeatureKey, CombineState } from '../reducers';
import { bestEvaluatedMangaFeatureKey } from '../reducers/best-evaluated.reducer';
import { mangaListFeatureKey } from '../reducers/manga.reducer';
import { mostAnticipatedMangaFeatureKey } from '../reducers/most-anticipated.reducer';
import { mostPopularMangaFeatureKey } from '../reducers/most-popular.reducer';
import { trendingMangaFeatureKey } from '../reducers/trending.reducer';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);


/* === ANIMELIST === */
export const selectMangaListState = createSelector(
  selectCombineState,
  (state) => state[mangaListFeatureKey]
);


export const selectStatus = createSelector(
  selectMangaListState,
  (state) => state?.status
);

export const selectMangaList = createSelector(
  selectMangaListState,
  (state) => state?.mangaList
);

export const selectTotalCount = createSelector(
  selectMangaListState,
  (state) => state?.totalCount
);

export const selectFilters = createSelector(
  selectMangaListState,
  (state) => state?.filter
)

export const selectPage = createSelector(
  selectMangaListState,
  (state) => state?.page
);

export const selectError = createSelector(
  selectMangaListState,
  (state) => state?.error
);



/* === TRENDING ANIME === */
export const selectTrendingMangaState = createSelector(
  selectCombineState,
  (state) => state[trendingMangaFeatureKey]
);


export const selectTrendingMangaList = createSelector(
  selectTrendingMangaState,
  (state) => state?.mangaList
);

export const selectTrendingStatus = createSelector(
  selectTrendingMangaState,
  (state) => state?.status
);


/* === TRENDING ANIME === */
export const selectBestEvaluatedMangaState = createSelector(
  selectCombineState,
  (state) => state[bestEvaluatedMangaFeatureKey]
);


export const selectBestEvaluatedMangaList = createSelector(
  selectBestEvaluatedMangaState,
  (state) => state?.mangaList
);

export const selectBestEvaluatedMStatus = createSelector(
  selectBestEvaluatedMangaState,
  (state) => state?.status
);



/* === TRENDING ANIME === */
export const selectMostAnticipatedMangaState = createSelector(
  selectCombineState,
  (state) => state[mostAnticipatedMangaFeatureKey]
);


export const selectMostAnticipatedMangaList = createSelector(
  selectMostAnticipatedMangaState,
  (state) => state?.mangaList
);

export const selectdMostAnticipatedStatus = createSelector(
  selectMostAnticipatedMangaState,
  (state) => state?.status
);


/* === TRENDING ANIME === */
export const selectMostPopularMangaState = createSelector(
  selectCombineState,
  (state) => state[mostPopularMangaFeatureKey]
);


export const selectMostPopularMangaList = createSelector(
  selectMostPopularMangaState,
  (state) => state?.mangaList
);

export const selectdMostPopularStatus = createSelector(
  selectMostPopularMangaState,
  (state) => state?.status
);


