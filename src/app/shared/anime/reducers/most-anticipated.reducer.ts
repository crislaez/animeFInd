import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as AnimeActions from '../actions/anime.actions';

export const mostAnticipatedAnimeFeatureKey = 'mostAnticipatedAnime';

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
  on(AnimeActions.loadMostAnticipatedAnimeList, (state): State => ({
    ...state,
    status: EntityStatus.Pending,
    error: undefined,
  })),
  on(AnimeActions.saveMostAnticipatedAnimeList, (state, { animeList, status, error }): State => ({
    ...state,
    animeList,
    status,
    error,
  })),

);
