import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';
import { EntityStatus } from '../../utils/functions';
import { Category } from './../models/index';

export const categoryFeatureKey = 'category';


export interface State {
  error?: unknown;
  categories?: Category[];
  status?: EntityStatus
}

export const initialState: State = {
  error: undefined,
  categories:[],
  status: EntityStatus.Initial
};

export const reducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state, ): State => ({
    ...state,
    error: undefined,
    status: EntityStatus.Pending
  })),
  on(CategoryActions.saveCategories, (state, { categories, status, error }): State => ({
    ...state,
    categories,
    error,
    status
  })),
);
