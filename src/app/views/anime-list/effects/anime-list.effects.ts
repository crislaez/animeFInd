import { Injectable } from '@angular/core';
import { AnimeActions } from '@findAnime/shared/anime';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as ActionAnimeListPage from '../actions/anime-list.page.actions';


@Injectable()
export class AnimeListPageEffects implements OnInitEffects {

  initAnimeListPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionAnimeListPage.initAnimeListPage),
      map(() => AnimeActions.loadAnimeList({page:0, filter:{}}))
    )
  });

  ngrxOnInitEffects(): Action {
    return ActionAnimeListPage.initAnimeListPage();
  }


  constructor(
    private actions$: Actions,
  ) { }


}
