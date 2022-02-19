import { Injectable } from '@angular/core';
import { NotificationActions } from '@findAnime/shared/notification';
import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AnimeActions from '../actions/anime.actions';
import { AnimeService } from '../services/anime.service';


@Injectable()
export class AnimeEffects {

  loadAnimeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimeActions.loadAnimeList),
      switchMap(({page, filter}) => {
        return this._anime.getAnimeList(page, filter).pipe(
          map(({animeList, totalCount }) => AnimeActions.saveAnimeList({ animeList, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              AnimeActions.saveAnimeList({ animeList:[], page:0, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_ANIME_LIST'})
            )
          })
        )
      })
    )
  });

  loadTrendingAnimeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimeActions.loadTrendingAnimeList),
      switchMap(() => {
        return this._anime.getTrendingAnime().pipe(
          map(({ trendingAnimeList }) => AnimeActions.saveTrendingAnimeList({ trendingAnimeList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              AnimeActions.saveTrendingAnimeList({ trendingAnimeList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TRENDING_ANIME_LIST'})
            )
          })
        )
      })
    )
  });

  tryLoadTrendingAnimeList$ = createEffect(() => {
    return of(AnimeActions.loadTrendingAnimeList())
  });


  constructor(
    private actions$: Actions,
    private _anime: AnimeService,
    public toastController: ToastController,
  ) { }


}
