import { Category } from './../models/index';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createAction, props } from '@ngrx/store';


export const loadCategories = createAction(
  '[Category] Load Categories'
);

export const saveCategories = createAction(
  '[Category] Save Categories',
  props<{ categories: Category[], error:unknown, status:EntityStatus }>()
);
