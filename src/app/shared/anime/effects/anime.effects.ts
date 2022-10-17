import { Injectable } from '@angular/core';
import { NotificationActions } from '@findAnime/shared/notification';
import { EntityStatus } from '@findAnime/shared/utils/functions';
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
          map(({ animeList }) => AnimeActions.saveTrendingAnimeList({ animeList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              AnimeActions.saveTrendingAnimeList({ animeList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TRENDING_ANIME_LIST'})
            )
          })
        )
      })
    )
  });

  loadMostAnticipatedAnimeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimeActions.loadMostAnticipatedAnimeList),
      switchMap(() => {
        return this._anime.getMostAnticipatedAnime().pipe(
          map(({ animeList }) => AnimeActions.saveMostAnticipatedAnimeList({ animeList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              AnimeActions.saveMostAnticipatedAnimeList({ animeList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOST_ANTICIPATED_ANIME_LIST'})
            )
          })
        )
      })
    )
  });

  loadBestEvaluatedAnimeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimeActions.loadBestEvaluatedAnimeList),
      switchMap(() => {
        return this._anime.getBestEvaluatedAnime().pipe(
          map(({ animeList }) => AnimeActions.saveBestEvaluatedAnimeList({ animeList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              AnimeActions.saveBestEvaluatedAnimeList({ animeList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_BEST_EVALUATED_ANIME_LIST'})
            )
          })
        )
      })
    )
  });

  loadMostPopularAnimeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnimeActions.loadMostPopularAnimeList),
      switchMap(() => {
        return this._anime.getMostPopularAnime().pipe(
          map(({ animeList }) => AnimeActions.saveMostPopularAnimeList({ animeList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              AnimeActions.saveMostPopularAnimeList({ animeList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOST_POPULAR_ANIME_LIST'})
            )
          })
        )
      })
    )
  });



  constructor(
    private actions$: Actions,
    private _anime: AnimeService,
    public toastController: ToastController,
  ) { }


}
