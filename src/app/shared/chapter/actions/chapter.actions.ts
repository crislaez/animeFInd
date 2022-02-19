import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Filter } from '../models';


export const loadChapters = createAction(
  '[Chapter] Load Chapters',
  props<{ idManga: string, page: number, filter?: Filter }>()
);

export const saveChapters = createAction(
  '[Chapter] Save Chapters',
  props<{ idManga: string, chapters: AnimeManga[], page: number, filter?: Filter, totalCount: number, error:unknown, status:EntityStatus }>()
);
