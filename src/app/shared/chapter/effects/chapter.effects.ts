import { Injectable } from '@angular/core';
import { NotificationActions } from '@findAnime/shared/notification';
import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ChapterActions from '../actions/chapter.actions';
import { ChapterService } from '../services/chapter.service';


@Injectable()
export class ChapterEffects {

  loadEpisodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChapterActions.loadChapters),
      switchMap(({idManga, page, filter}) => {
        return this._chapter.getChapters(idManga, page, filter).pipe(
          map(({chapters, totalCount }) => ChapterActions.saveChapters({ idManga, chapters, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              ChapterActions.saveChapters({ idManga:null, chapters:[], page:0, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_chapterS_LIST'})
            )
          })
        )
      })
    )
  });

  // init$ = createEffect(() => {
  //   return of(ChapterActions.loadEpisodes({idEpisode:'12531', page:0}))
  // })

  constructor(
    private actions$: Actions,
    private _chapter: ChapterService,
    public toastController: ToastController,
  ) { }


}
