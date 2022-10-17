import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as MangaActions from '../actions/manga.actions';

export const mostPopularMangaFeatureKey = 'mostPopularManga';

export interface State {
  mangaList?:AnimeManga[];
  status: EntityStatus;
  error?: unknown;
}

export const initialState: State = {
  mangaList:[],
  status: EntityStatus.Initial,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(MangaActions.loadMostPopularMangaList, (state): State => ({
    ...state,
    error: undefined,
    status: EntityStatus.Pending
  })),
  on(MangaActions.saveMostPopularMangaList, (state, { mangaList, status, error }): State => ({
    ...state,
    mangaList,
    status,
    error,
  })),

);
