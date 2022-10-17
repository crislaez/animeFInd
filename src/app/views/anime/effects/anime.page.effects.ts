import { Injectable } from '@angular/core';
import { AnimeActions } from '@findAnime/shared/anime';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as AnimePageActions from '../actions/anime.page.actions';


@Injectable()
export class AnimePageEffects implements OnInitEffects {

  initAnimePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimePageActions.initAnimePage),
      switchMap(() =>
        of(
          AnimeActions.loadTrendingAnimeList(),
          AnimeActions.loadMostAnticipatedAnimeList(),
          AnimeActions.loadBestEvaluatedAnimeList(),
          AnimeActions.loadMostPopularAnimeList(),
        )
      )
    )
  });

  ngrxOnInitEffects(): Action {
    return AnimePageActions.initAnimePage();
  };


  constructor(
    private actions$: Actions,
  ) { }


}
