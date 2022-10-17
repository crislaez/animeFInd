import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.State>(
  fromCategory.categoryFeatureKey
);

export const selectStatus = createSelector(
  selectCategoryState,
  (state) => state.status
);

export const selectCategories = createSelector(
  selectCategoryState,
  (state) => state?.categories
);

export const selectError = createSelector(
  selectCategoryState,
  (state) => state?.error
);

