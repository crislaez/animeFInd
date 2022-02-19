import { Attribute, ChangeDetectionStrategy, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { ChapterActions, fromChapter } from '@findAnime/shared/chapter';
import { EpisodeActions, Filter, fromEpisode } from '@findAnime/shared/episode';
import { emptyObject, EntityStatus, errorImage, getObjectKeys, gotToTop, sliceText, trackById, smallSliceText } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga, Attributes } from '@findAnime/shared/utils/models';
import { IonContent, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { ItemPopoverComponent } from './item-popover.component';


@Component({
  selector: 'app-card-modal',
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
    <div class="container">
      <ng-container *ngIf="emptyObject(item); else noData">
        <ion-card class="modal-ion-card ion-activatable ripple-parent">
          <ion-img class="modal-ion-card-image" [src]="getImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>
          <!-- <ion-img *ngIf="getImage(item, false)" [src]="getImage(item, false)" loading="lazy" (ionError)="errorImage($event)"></ion-img> -->

          <ion-card-content>
            <div class="ion-card-content-container displays-around text-color-ligth">
              <!-- <div class="width-90 big-size-medium text-center span-bold">{{ getTitle(item?.attributes?.titles) }}</div> -->

              <div class="width-90 big-size-medium text-center span-bold">{{ item?.attributes?.showType || item?.attributes?.subtype}}</div>

              <div class="width-40 mediun-size span-bold">{{ 'COMMON.CREATE' | translate }}:</div>
              <div class="width-40 mediun-size">{{ (item?.attributes?.startDate || item?.attributes?.createdAt) | date: 'MMM d, y' }}</div>

              <ng-container *ngIf="item?.attributes?.endDate && !['movie']?.includes(item?.attributes?.showType) && filterType(item?.attributes) && item?.attributes?.mangaType !== 'manga'">
                <div class="width-40 mediun-size span-bold">{{ 'COMMON.FINISH_DATE' | translate }}:</div>
                <div class="width-40 mediun-size">{{ item?.attributes?.endDate | date: 'MMM d, y' }}</div>
              </ng-container>

              <ng-container *ngIf="!['movie', 'special']?.includes(item?.attributes?.showType)">
                <div class="width-40 mediun-size span-bold">{{ 'COMMON.STATUS' | translate }}:</div>
                <div class="width-40 mediun-size">{{ item?.attributes?.status }}</div>
              </ng-container>

              <ng-container *ngIf="item?.attributes?.averageRating as averageRating">
                <div class="width-40 mediun-size span-bold">{{ 'COMMON.AVERAGE_RATING' | translate }}:</div>
                <div class="width-40 mediun-size">{{ averageRating }}</div>
              </ng-container>

              <ng-container *ngIf="item?.attributes?.ageRatingGuide as ageRatingGuide">
                <div class="width-40 mediun-size span-bold">{{ 'COMMON.AGE_RATING_GUIDE' | translate }}:</div>
                <div class="width-40 mediun-size">{{ ageRatingGuide }}</div>
              </ng-container>

              <!-- ANIME  -->
              <ng-container *ngIf="item?.attributes?.episodeCount && item?.attributes?.showType === 'TV'">
                <div class="width-40 mediun-size span-bold">{{ 'COMMON.NUMBER_EPISODES' | translate }}:</div>
                <div class="width-40 mediun-size">{{ item?.attributes?.episodeCount }}</div>
              </ng-container>
               <!-- ****  -->

              <ng-container *ngIf="item?.attributes?.episodeLength">
                <div class="width-40 mediun-size span-bold">{{ 'COMMON.DURATION' | translate }}:</div>
                <div class="width-40 mediun-size">{{ item?.attributes?.episodeLength }} {{ 'COMMON.MINUTES' | translate }}</div>
              </ng-container>

              <!-- MANGA  -->
              <!-- ****  -->

              <!-- DESCRIPTION  -->
              <div class="width-90 mediun-size text-center span-bold">{{ 'COMMON.DESCRIPTION' | translate }}</div>
              <div class="width-90 mediun-size">{{ item?.attributes?.synopsis }}</div>

              <ng-container *ngIf="(episodesOrChapters$ | async) as episodesOrChapters">
                <ng-container *ngIf="(status$ | async) as status">
                  <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 0; else loader">
                    <ng-container *ngIf="status !== 'error'; else serverError">
                      <ng-container *ngIf="episodesOrChapters?.length > 0; else noData">

                        <ion-card class="ion-activatable ripple-parent ion-card" *ngFor="let item of episodesOrChapters; let i = index; trackBy: trackById" (click)="openItemPopover(item)">
                          <ion-img [src]="getEpisodeChapterImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>

                          <ion-card-header class="ion-card-header font-medium">
                            <!-- ANIME  -->
                            <div *ngIf="item?.attributes?.seasonNumber as seasonNumber">{{ 'COMMON.SEASON' | translate }} {{ seasonNumber }}</div>
                            <div *ngIf="statusComponent?.type === 'TV' && item?.attributes?.number">{{ 'COMMON.EPISODE' | translate }} {{ item?.attributes?.number }}</div>
                            <!-- ****  -->

                            <!-- MANGA  -->
                            <!-- <div *ngIf="item?.attributes?.volumeNumber as volumeNumber">{{ 'COMMON.VOLUMEN' | translate }} {{ volumeNumber }}</div> -->
                            <!-- ****  -->

                            <!-- <div *ngIf="item?.attributes?.titles as title">{{ smallSliceText(getTitle(title)) }}</div> -->
                            <!-- <div *ngIf="item?.attributes?.airdate as airdate">{{ airdate | date: 'MMM d, y' }}</div> -->
                          </ion-card-header>
                          <!-- RIPLE EFFECT  -->
                          <ion-ripple-effect></ion-ripple-effect>
                        </ion-card>

                        <!-- INFINITE SCROLL  -->
                        <ng-container *ngIf="totalCount$| async as total">
                          <ng-container *ngIf="episodesOrChapters?.length < total">
                            <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
                              <ion-infinite-scroll-content class="loadingspinner">
                              </ion-infinite-scroll-content>
                            </ion-infinite-scroll>
                          </ng-container>
                        </ng-container>

                      </ng-container>
                    </ng-container>
                  </ng-container>
                </ng-container>
              </ng-container>
            </div>

          </ion-card-content>

        </ion-card>
      </ng-container>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <div class="error-serve heigth-mid">
          <div>
            <span>
              <!-- <ion-icon class="text-color-light max-size" name="cloud-offline-outline"></ion-icon> -->
              <img [src]="'assets/images/error.png'"/>
            </span>
            <br>
            <span class="text-color-light">{{'COMMON.ERROR' | translate}}</span>
          </div>
        </div>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <div class="error-serve heigth-mid">
          <div>
            <span>
              <!-- <ion-icon class="text-color-light max-size" name="clipboard-outline"></ion-icon> -->
              <img [src]="'assets/images/empty.png'"/>
            </span>
            <br>
            <span class="text-color-light">{{'COMMON.NORESULT_ONLY' | translate}}</span>
          </div>
        </div>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <!-- <ion-spinner class="loadingspinner heigth-small"></ion-spinner> -->
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `,
  styleUrls: ['./card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardModalComponent {

  gotToTop = gotToTop;
  errorImage = errorImage;
  emptyObject = emptyObject;
  getObjectKeys = getObjectKeys;
  sliceText = sliceText;
  trackById = trackById;
  smallSliceText = smallSliceText;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  @Input() item: AnimeManga;
  showButton = false;

  perPage: number = this._coreConfig.getPerPage();
  infiniteScrollTrigger = new EventEmitter<{id:string, type?:string, page?:number, filter?:Filter}>();
  statusComponent: {id:string, type?:string, page?:number, filter?:Filter} = {
    id:'',
    type:'',
    page:0,
    filter: {}
  };

  status$: Observable<EntityStatus>;
  totalCount$: Observable<number>;

  episodesOrChapters$ = this.infiniteScrollTrigger.pipe(
    filter(({id}) => !!id),
    tap(({id, type, page, filter}) => {
      if(['TV','special','ONA']?.includes(type)) this.store.dispatch(EpisodeActions.loadEpisodes({idAnime:id, page, filter}))
      // if(type === 'manga') this.store.dispatch(ChapterActions.loadChapters({idManga:id, page, filter}))
    }),
    switchMap(({type}) => {
      return this.store.select(fromEpisode.getEpisodes)
      // return type === 'TV'
      //   ? this.store.select(fromEpisode.getEpisodes)
      //   : this.store.select(fromChapter.getChapters);
    })
    // ,map(d => ([]))
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public modalController: ModalController,
    private _coreConfig: CoreConfigService
  ) { }


  ionViewWillEnter(): void{
    // console.log(this.item)
    const { id = null, attributes:{ showType = null, mangaType = null, episodeCount = null } = null } = this.item || {};

    if(id && ['TV','special','ONA']?.includes(showType) && (!episodeCount || episodeCount > 1)){
      this.statusComponent = {
        id,
        type:'TV',
        page:0,
        filter:{}
      };

      this.infiniteScrollTrigger.next(this.statusComponent);
      this.status$ = this.store.select(fromEpisode.getStatus);
      this.totalCount$ = this.store.select(fromEpisode.getTotalCount)
    }
    // if(id && (showType === 'TV' || mangaType === 'manga')){
      // this.statusComponent = {
      //   id,
      //   ...(showType === 'TV'  ? {type:showType} : {type:mangaType}),
      //   page:0,
      //   filter:{}
      // }
      // this.infiniteScrollTrigger.next(this.statusComponent);
      // this.status$ = showType === 'TV' ? this.store.select(fromEpisode.getStatus) : this.store.select(fromChapter.getStatus);
      // this.totalCount$ = showType === 'TV' ? this.store.select(fromEpisode.getTotalCount) : this.store.select(fromChapter.getTotalCount);
    // }
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

  // INIFINITE SCROLL
  loadData(event, total) {
    setTimeout(() => {
      this.statusComponent = {...this.statusComponent, page: this.statusComponent?.page + this.perPage };

      if(this.statusComponent?.page >= total){
        if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
      }

      this.infiniteScrollTrigger.next(this.statusComponent);
      event.target.complete();
    }, 500);
  }

  getImage(item: AnimeManga, option: boolean): string{
    const { attributes = null } = item || {};
    const { posterImage = null, coverImage = null } = attributes || {};
    return option
      ? posterImage?.large || posterImage?.medium || posterImage?.original || posterImage?.tiny
      : coverImage?.large
  }

  getEpisodeChapterImage(item: AnimeManga, option: boolean): string{
    const { attributes = null } = item || {};
    const { thumbnail = null } = attributes || {};
    const { original = null } = thumbnail || {};
    return original || ''
  }

  getTitle(titles: any): string{
    return titles['en'] || titles['en_jp'] || titles['en_us'] || titles['en_cn'] || '';
  }

  filterType(attribute: Attributes): boolean{
    const { showType = null, episodeCount = null} = attribute || {};
    return ['special', 'ONA']?.includes(showType) && episodeCount > 1 ? true : false
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

    // modal.onDidDismiss()
    //   .then((res) => {
    //     const { data } = res || {};
    //     if(!!data){
    //       this.statusComponent = { ...data }
    //       this.infiniteScroll$.next(this.statusComponent);
    //       if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
    //     }
    // });

    return await modal.present();
  }

}
