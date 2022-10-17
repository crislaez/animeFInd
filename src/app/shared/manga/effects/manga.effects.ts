import { Injectable } from '@angular/core';
import { NotificationActions } from '@findAnime/shared/notification';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as MangaActions from '../actions/manga.actions';
import { MangaService } from '../services/manga.service';


@Injectable()
export class MangaEffects {

  loadMangaList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MangaActions.loadMangaList),
      switchMap(({page, filter}) => {
        return this._manga.getMangaList(page, filter).pipe(
          map(({mangaList, totalCount }) => MangaActions.saveMangaList({ mangaList, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              MangaActions.saveMangaList({ mangaList:[], page:0, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MANGA_LIST'})
            )
          })
        )
      })
    )
  });

  loadTrendingMangaList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MangaActions.loadTrendingMangaList),
      switchMap(() => {
        return this._manga.getTrendingManga().pipe(
          map(({ mangaList }) => MangaActions.saveTrendingMangaList({ mangaList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              MangaActions.saveTrendingMangaList({ mangaList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TRENDING_MANGA_LIST'})
            )
          })
        )
      })
    )
  });

  loadMostAnticipatedMangaList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MangaActions.loadMostAnticipatedMangaList),
      switchMap(() => {
        return this._manga.getMostAnticipatedManga().pipe(
          map(({ mangaList }) => MangaActions.saveMostAnticipatedMangaList({ mangaList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              MangaActions.saveMostAnticipatedMangaList({ mangaList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOST_ANTICIPATED_MANGA_LIST'})
            )
          })
        )
      })
    )
  });

  loadBestEvaluatedMangaList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MangaActions.loadBestEvaluatedMangaList),
      switchMap(() => {
        return this._manga.getBestEvaluatedManga().pipe(
          map(({ mangaList }) => MangaActions.saveBestEvaluatedMangaList({ mangaList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              MangaActions.saveBestEvaluatedMangaList({ mangaList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_BEST_EVALUATED_MANGA_LIST'})
            )
          })
        )
      })
    )
  });

  loadMostPopularMangaList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MangaActions.loadMostPopularMangaList),
      switchMap(() => {
        return this._manga.getMostPopularManga().pipe(
          map(({ mangaList }) => MangaActions.saveMostPopularMangaList({ mangaList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              MangaActions.saveMostPopularMangaList({ mangaList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOST_POPULAR_MANGA_LIST'})
            )
          })
        )
      })
    )
  });



  constructor(
    private actions$: Actions,
    private _manga: MangaService,
    public toastController: ToastController,
  ) { }


}
