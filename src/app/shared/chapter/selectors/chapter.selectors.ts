import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChapter from '../reducers/chapter.reducer';

export const selectorChapterState = createFeatureSelector<fromChapter.State>(
  fromChapter.chapterFeatureKey
);

export const getStatus = createSelector(
  selectorChapterState,
  (state) => state?.status
);

export const getChapters = createSelector(
  selectorChapterState,
  (state) => state?.chapters
);

export const getTotalCount = createSelector(
  selectorChapterState,
  (state) => state?.totalCount
);

export const getFilters = createSelector(
  selectorChapterState,
  (state) => state?.filter
)

export const getPage = createSelector(
  selectorChapterState,
  (state) => state?.page
);

export const getError = createSelector(
  selectorChapterState,
  (state) => state?.error
);

export const getIdManga = createSelector(
  selectorChapterState,
  (state) => state?.idManga
);

