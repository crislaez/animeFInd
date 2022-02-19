import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as ChapterActions from '../actions/chapter.actions';
import { Filter } from '../models';

export const chapterFeatureKey = 'chapter';

export interface State {
  status: EntityStatus;
  chapters?: AnimeManga[];
  page?:number;
  totalCount?:number;
  filter?: Filter;
  error?: unknown;
  idManga?: string;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  chapters: [],
  page: 0,
  totalCount:0,
  filter: null,
  error: undefined,
  idManga:null
};

export const reducer = createReducer(
  initialState,
  on(ChapterActions.loadChapters, (state): State => ({ ...state,  error: undefined, status: EntityStatus.Pending })),
  on(ChapterActions.saveChapters, (state, { idManga, chapters, page, filter, totalCount, status, error }): State => {
    const chaptersState = page === 0 ? [...chapters] : [...state?.chapters, ...chapters];
    return ({ ...state, idManga, chapters: chaptersState || [], page, filter, totalCount, status, error })
  }),

);
