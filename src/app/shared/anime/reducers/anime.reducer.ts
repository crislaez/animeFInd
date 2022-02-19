import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as AnimeActions from '../actions/anime.actions';
import { Filter } from '../models';

export const animeFeatureKey = 'anime';

export interface State {
  status: EntityStatus;
  animeList?: AnimeManga[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
  trendingAnimeList?: AnimeManga[];
  trendingStatus: EntityStatus;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  animeList: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined,
  trendingAnimeList:[],
  trendingStatus: EntityStatus.Initial
};

export const reducer = createReducer(
  initialState,
  on(AnimeActions.loadAnimeList, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(AnimeActions.saveAnimeList, (state, { animeList, page, filter, totalCount, status, error }): State => {
    const animeListState = page === 0 ? [...animeList] : [...state?.animeList, ...animeList];
    return ({ ...state, animeList: animeListState || [], page, filter, totalCount, status, error })
  }),

  on(AnimeActions.loadTrendingAnimeList, (state): State => ({ ...state,  error: undefined, trendingStatus: EntityStatus.Pending })),
  on(AnimeActions.saveTrendingAnimeList, (state, { trendingAnimeList, status, error }): State => ({ ...state, trendingAnimeList,  error, trendingStatus: status })),

);
