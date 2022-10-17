import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as MangaActions from '../actions/manga.actions';
import { Filter } from '../models';

export const mangaListFeatureKey = 'mangaList';

export interface State {
  status: EntityStatus;
  mangaList?: AnimeManga[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  mangaList: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(MangaActions.loadMangaList, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(MangaActions.saveMangaList, (state, { mangaList, page, filter, totalCount, status, error }): State => {
    return ({
      ...state,
      mangaList: page === 0
              ? mangaList
              :  [...state?.mangaList, ...(mangaList ?? [])],
      page,
      filter,
      totalCount,
      status,
      error
    })
  }),
);
