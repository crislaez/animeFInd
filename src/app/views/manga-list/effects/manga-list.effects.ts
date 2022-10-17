import { Injectable } from '@angular/core';
import { MangaActions } from '@findAnime/shared/manga';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as ActionMangaListPage from '../actions/manga-list.page.actions';


@Injectable()
export class MangaListPageEffects implements OnInitEffects {

  initAnimeListPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionMangaListPage.initMangaListPage),
      map(() => MangaActions.loadMangaList({page:0, filter:{}}))
    )
  });

  ngrxOnInitEffects(): Action {
    return ActionMangaListPage.initMangaListPage();
  }


  constructor(
    private actions$: Actions,
  ) { }


}
