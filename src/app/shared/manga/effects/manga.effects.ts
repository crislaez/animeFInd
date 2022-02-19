import { Injectable } from '@angular/core';
import { NotificationActions } from '@findAnime/shared/notification';
import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
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
          map(({ trendingMangaList }) => MangaActions.saveTrendingMangaList({ trendingMangaList, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              MangaActions.saveTrendingMangaList({ trendingMangaList:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TRENDING_MANGA_LIST'})
            )
          })
        )
      })
    )
  });

  tryLoadTrendingMangaList$ = createEffect(() => {
    return of(MangaActions.loadTrendingMangaList())
  });

  constructor(
    private actions$: Actions,
    private _manga: MangaService,
    public toastController: ToastController,
  ) { }


}
