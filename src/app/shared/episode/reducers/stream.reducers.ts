import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from '../actions/episode.actions';
import { Stream } from '../models';

export const streamFeatureKey = 'stream';

export interface StreamState {
  status: EntityStatus;
  streams: Stream[];
}

export interface State {
  error: unknown;
  links: { [key:string]: StreamState };
}

export const initialState: State = {
  error: undefined,
  links: {},
};

export const reducer = createReducer(
  initialState,
  on(EpisodeActions.loadStreams, (state, {idAnime}): State => ({
    ...state,
    error: undefined,
    links:{
      ...state?.links,
      [idAnime]:{
        ...state?.links?.[idAnime],
        status: EntityStatus.Pending
      }
    }
  })),
  on(EpisodeActions.saveStreams, (state, { idAnime, streams, status, error }): State => {
    return ({
      ...state,
      error,
      links:{
        ...state?.links,
        [idAnime]:{
          ...state?.links?.[idAnime],
          status,
          streams
        }
      }
    })
  }),

);
