import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { EpisodeActions, fromEpisode } from '@findAnime/shared/episode';
import { AnimeManga } from '@findAnime/shared/models';
import { EntityStatus, errorImage, getImage, getObjectKeys, getTitle, gotToTop, isNotEmptyObject, sliceText, trackById } from '@findAnime/shared/utils/functions';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ItemPopoverComponent } from '../item-popover/item-popover';

interface ModalInferface {
  id:string;
  type?:string;
  page?:number;
  reload?: boolean;
};


@Component({
  selector: 'app-info-modal',
  template:`
  <!-- HEADER  -->
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title class="text-color-light">{{ sliceText(getTitle(item?.attributes?.titles)) }}</ion-title>
      <ion-buttons class="text-color-light" slot="end">
        <ion-button class="ion-button-close" (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <!-- MAIN  -->
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
    <div class="container-modal">
      <ng-container *ngIf="isNotEmptyObject(item); else noData">

        <ion-img class="modal-ion-card-image" [src]="getImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>

        <div class="div-center margin-top-20 margin-bottom-10">
          <h2 class="text-color-light margin-left-5">{{ 'COMMON.INFORMATION' | translate }}</h2>
        </div>

        <app-info-card
          [item]="item">
        </app-info-card>

        <ng-container>
          <ng-container *ngIf="streamInfo$ | async as streamInfo">
            <ng-container *ngIf="streamInfo?.status === 'loaded'">
              <ng-container *ngIf="streamInfo?.streams?.length > 0">
                <div class="div-center margin-top-20 margin-bottom-10">
                  <h2 class="text-color-light margin-left-5">{{ 'COMMON.LINKS' | translate }}</h2>
                </div>
                <div class="item-wrapper displays-around">
                  <ng-container *ngFor="let stream of streamInfo?.streams; trackBy: trackById">
                    <ng-container *ngIf="stream?.attributes?.url as url">
                      <a [href]="url">
                        <img [src]="getLinkImage(url)" (error)="errorImage($event)" [alt]="url"/>
                      </a>
                    </ng-container>
                  </ng-container>
                </div>
              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>

        <ng-container *ngIf="(info$ | async) as info">
          <ng-container *ngIf="(status$ | async) as status">
            <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 0; else loader">
              <ng-container *ngIf="status !== 'error'; else serverError">
                <ng-container *ngIf="info?.episodes?.length > 0; else noData">

                  <div class="div-center margin-top-20 margin-bottom-10">
                    <h2 class="text-color-light margin-left-5">{{ 'COMMON.EPISODES' | translate }}</h2>
                  </div>

                  <div class="displays-around item-wrapper">
                    <app-episode-card
                      *ngFor="let episode of info?.episodes; let i = index; trackBy: trackById"
                      [episode]="episode"
                      [type]="statusComponent?.type"
                      (openItemPopover)="openItemPopover($event)">
                    </app-episode-card>

                    <app-infinite-scroll
                      [slice]="info?.episodes?.length"
                      [status]="status"
                      [total]="info?.total"
                      (loadDataTrigger)="loadData($event, info?.page)">
                    </app-infinite-scroll>
                  </div>
                </ng-container>
              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
        <!-- </div> -->
      </ng-container>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'10vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT_ONLY'" [image]="'assets/images/empty.png'" [top]="'10vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `,
  styleUrls: ['./info-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoModalComponent {

  gotToTop = gotToTop;
  getImage = getImage;
  getTitle = getTitle;
  sliceText = sliceText;
  trackById = trackById;
  errorImage = errorImage;
  isNotEmptyObject = isNotEmptyObject;
  getObjectKeys = getObjectKeys;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @Input() item: AnimeManga;
  showButton = false;
  perPage: number = this._coreConfig.getPerPage();

  status$: Observable<EntityStatus>;
  totalCount$: Observable<number>;

  trigger = new EventEmitter<ModalInferface>();
  statusComponent: ModalInferface;
  info$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromEpisode.selectAllAnimes)),
    tap(([{id:idAnime, page}, allAnimes]) => {

      if(!allAnimes?.[idAnime] || page > 0){
        this.store.dispatch(EpisodeActions.loadEpisodes({idAnime, page}))
      }

    }),
    switchMap(([{id:idAnime}]) =>
      this.store.select(fromEpisode.selectAnimeSelectedEpisodes(idAnime)).pipe(
        concatLatestFrom(() => [
          this.store.select(fromEpisode.selectAnimeSelectedPage(idAnime)),
          this.store.select(fromEpisode.selectAnimeSelectedTotalCount(idAnime))
        ]),
        map(([episodes = [], page = 0, total = 0]) => ({episodes, page, total}))
      )
    )
    // ,tap(d => console.log(d))
  );

  streamTrigger = new EventEmitter<AnimeManga>();
  streamInfo$ = this.streamTrigger.pipe(
    concatLatestFrom(() => this.store.select(fromEpisode.selectStreamLink)),
    tap(([animeManga, linksState]) => {
      const { id:idAnime = null, relationships = null } = animeManga || {};
      const { streamingLinks = null } = relationships || {};
      const { links = null } = streamingLinks || {};

      if(!linksState?.[idAnime]){
        this.store.dispatch(EpisodeActions.loadStreams({idAnime, url:links?.related}))
      }
    }),
    switchMap(([animeManga]) =>
      this.store.select(fromEpisode.selectStreamLinkStreams(animeManga?.id)).pipe(
        concatLatestFrom(() => this.store.select(fromEpisode.selectStreamLinkStatus(animeManga?.id))),
        map(([streams = [], status = EntityStatus.Initial]) => ({streams, status}))
      )
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public modalController: ModalController,
    private _coreConfig: CoreConfigService
  ) { }


  ionViewWillEnter(): void{
    const { id = null, attributes:{ showType = null, mangaType = null, episodeCount = null } = null } = this.item || {};

    if(id && ['TV','special','ONA']?.includes(showType) && (!episodeCount || episodeCount > 1)){
      this.statusComponent = {
        id,
        type:'TV',
        page:0,
        reload: false
      };

      this.streamTrigger.next(this.item);
      this.trigger.next(this.statusComponent);
      this.status$ = this.store.select(fromEpisode.selectAnimeSelectedStatus(id));
    }
  }

  // INIFINITE SCROLL
  loadData({event, total}, storePage: number) {
    this.statusComponent = {
      ...this.statusComponent,
      page: storePage + this.perPage,
      reload: false
    };
    this.trigger.next(this.statusComponent);
    event.target.complete();
  }

  // OPEN FILTER MODAL
  async openItemPopover( item: AnimeManga ) {
    const modal = await this.modalController.create({
      component: ItemPopoverComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        item
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.4, //modal height
    });
    return await modal.present();
  }

  getLinkImage(url: string): string {
    const logos = ['funimation','hulu','vrv','crunchyroll','tubitv','amazon'];
    const urlName = logos?.find((item) => url?.includes(item)) || '';
    return `assets/images/${urlName}.png`;
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}

