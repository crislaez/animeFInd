import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from '../actions/episode.actions';

export const episodeFeatureKey = 'episode';

export interface EpisodeState {
  status: EntityStatus;
  episodes?: AnimeManga[];
  page?:number;
  totalCount?:number;
}

export interface State {
  error?: unknown;
  animes: {[key:string]:EpisodeState}
}

export const initialState: State = {
  error: undefined,
  animes:{}
};

export const reducer = createReducer(
  initialState,
  on(EpisodeActions.loadEpisodes, (state, { idAnime }): State => ({
    ...state,
    error: undefined,
    animes:{
      ...state?.animes,
      [idAnime]:{
        ...state?.animes?.[idAnime],
        status:  EntityStatus.Pending
      }
    }
  })),
  on(EpisodeActions.saveEpisodes, (state, { idAnime, episodes, page, totalCount, status, error }): State => {
    return ({
      ...state,
      error,
      animes: {
        ...state?.animes,
        [idAnime]:{
          ...state?.animes?.[idAnime],
          episodes: page === 0
                  ? episodes
                  : [...state?.animes?.[idAnime]?.episodes, ...(episodes ?? [])],
          page,
          totalCount,
          status,
        }
      }

    })
  }),

);
