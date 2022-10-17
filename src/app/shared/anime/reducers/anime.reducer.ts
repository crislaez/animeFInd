import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as AnimeActions from '../actions/anime.actions';
import { Filter } from '../models';

export const animeListFeatureKey = 'animeList';

export interface State {
  status: EntityStatus;
  animeList?: AnimeManga[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  animeList: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AnimeActions.loadAnimeList, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(AnimeActions.saveAnimeList, (state, { animeList, page, filter, totalCount, status, error }): State => {
    return ({
      ...state,
      animeList: page === 0
              ? animeList
              : [...state?.animeList, ...(animeList ?? [])],
      page,
      filter,
      totalCount,
      status,
      error
     })
  }),

);
