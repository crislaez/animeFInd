import { Injectable } from '@angular/core';
import { MangaActions } from '@findAnime/shared/manga';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as MangaPageActions from '../actions/manga.page.actions';

@Injectable()
export class MangaPageEffects implements OnInitEffects {

  initAnimePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MangaPageActions.initMangaPage),
      switchMap(() =>
        of(
          MangaActions.loadTrendingMangaList(),
          MangaActions.loadMostAnticipatedMangaList(),
          MangaActions.loadBestEvaluatedMangaList(),
          MangaActions.loadMostPopularMangaList(),
        )
      )
    )
  });

  ngrxOnInitEffects(): Action {
    return MangaPageActions.initMangaPage();
  };


  constructor(
    private actions$: Actions,
  ) { }


}
