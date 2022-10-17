import { EntityStatus } from '@findAnime/shared/utils/functions';
import { AnimeManga } from '@findAnime/shared/models';
import { createReducer, on } from '@ngrx/store';
import * as AnimeActions from '../actions/anime.actions';

export const trendingAnimeFeatureKey = 'trendingAnime';

export interface State {
  status: EntityStatus;
  animeList?: AnimeManga[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  animeList:[],
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AnimeActions.loadTrendingAnimeList, (state): State => ({
    ...state,
    status: EntityStatus.Pending,
    error: undefined,
  })),
  on(AnimeActions.saveTrendingAnimeList, (state, { animeList, status, error }): State => ({
    ...state,
    animeList,
    status,
    error,
  })),

);
