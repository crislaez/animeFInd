import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from '../actions/episode.actions';
import { Filter } from '../models';

export const episodeFeatureKey = 'episode';

export interface State {
  status: EntityStatus;
  episodes?: AnimeManga[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
  idAnime?: string;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  episodes: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined,
  idAnime:null
};

export const reducer = createReducer(
  initialState,
  on(EpisodeActions.loadEpisodes, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(EpisodeActions.saveEpisodes, (state, { idAnime, episodes, page, filter, totalCount, status, error }): State => {
    const episodesState = page === 0 ? [...episodes] : [...state?.episodes, ...episodes];
    return ({ ...state, idAnime, episodes: episodesState || [], page, filter, totalCount, status, error })
  }),

);
