import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as MangaActions from '../actions/manga.actions';
import { Filter } from '../models';

export const mangaFeatureKey = 'manga';

export interface State {
  status: EntityStatus;
  mangaList?: AnimeManga[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
  trendingMangaList?:AnimeManga[];
  trendingStatus: EntityStatus;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  mangaList: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined,
  trendingMangaList:[],
  trendingStatus: EntityStatus.Initial
};

export const reducer = createReducer(
  initialState,
  on(MangaActions.loadMangaList, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(MangaActions.saveMangaList, (state, { mangaList, page, filter, totalCount, status, error }): State => {
    const animeListState = page === 0 ? [...mangaList] : [...state?.mangaList, ...mangaList];
    return ({ ...state, mangaList: animeListState || [], page, filter, totalCount, status, error })
  }),

  on(MangaActions.loadTrendingMangaList, (state): State => ({ ...state,  error: undefined, trendingStatus: EntityStatus.Pending })),
  on(MangaActions.saveTrendingMangaList, (state, { trendingMangaList, status, error }): State => ({ ...state, trendingMangaList,  error, trendingStatus: status })),

);
