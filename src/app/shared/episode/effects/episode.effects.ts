import { Injectable } from '@angular/core';
import { NotificationActions } from '@findAnime/shared/notification';
import { EntityStatus } from '@findAnime/shared/utils/helpers/functions';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as EpisodesActions from '../actions/episode.actions';
import { EpisodeService } from '../services/episode.service';


@Injectable()
export class EpisodesEffects {

  loadEpisodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EpisodesActions.loadEpisodes),
      switchMap(({idAnime, page, filter}) => {
        return this._episode.getEpisodes(idAnime, page, filter).pipe(
          map(({episodes, totalCount }) => EpisodesActions.saveEpisodes({ idAnime, episodes, page, totalCount, filter, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              EpisodesActions.saveEpisodes({ idAnime:null, episodes:[], page:0, totalCount:0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_EPISODES_LIST'})
            )
          })
        )
      })
    )
  });

  // init$ = createEffect(() => {
  //   return of(EpisodesActions.loadEpisodes({idEpisode:'12531', page:0}))
  // })

  constructor(
    private actions$: Actions,
    private _episode: EpisodeService,
    public toastController: ToastController,
  ) { }


}
