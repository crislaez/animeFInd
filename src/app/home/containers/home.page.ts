import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { CardModalComponent } from '@findAnime/shared-ui/generic/components/card-modal.component';
import { AnimeActions, Filter, fromAnime } from '@findAnime/shared/anime';
import { fromManga, MangaActions } from '@findAnime/shared/manga';
import { emptyObject, EntityStatus, errorImage, getObjectKeys, gotToTop, sliceLongText, sliceText, trackById } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models/index';
import { IonContent, IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-home',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-color components-background-primary">
      <!-- FORM  -->
      <form (submit)="searchSubmit($event)" *ngIf="(getStatus() | async) !== 'pending'">
        <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
      </form>
    </div>

    <!-- BODY  -->
    <div class="container components-background-dark">

      <!-- Disabled Segment -->
      <ion-segment class="text-color-primary" (ionChange)="segmentChanged($event)" value="Anime">
        <ion-segment-button value="Anime">
          <ion-label class="text-color-primary mediun-size span-bold">{{ 'COMMON.ANIME' | translate }}</ion-label>
        </ion-segment-button>
        <ion-segment-button value="Manga">
          <ion-label class="text-color-primary mediun-size span-bold">{{ 'COMMON.MANGA' | translate }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ng-container *ngIf="(trendingList$ | async) as trendingList">
        <ng-container *ngIf="(getTrendingStatus() | async) as trendingStatus">
          <ng-container *ngIf="trendingStatus !== 'pending' && !transitionPending; else loader">
            <ng-container *ngIf="trendingList?.length > 0">

              <div>
                <h2 class="text-color-light">{{'COMMON.TRENDING' | translate}}</h2>
              </div>

              <!-- LAST SETS SLIDER  -->
              <swiper #swiper effect="fade" *ngIf="trendingList?.length > 0" [config]="getSliderConfig(trendingList)" >
                <ng-template swiperSlide *ngFor="let item of trendingList; trackBy: trackById" >
                  <ion-card class="ion-activatable ripple-parent slide-ion-card" (click)="openSingleCardModal(item)" >
                    <ion-img class="ion-card-image" [src]="getImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                    <ion-card-header class="font-medium text-color-light">
                      {{ sliceText(getTitle(item?.attributes?.titles)) }}
                    </ion-card-header>
                    <!-- RIPLE EFFECT  -->
                    <ion-ripple-effect></ion-ripple-effect>
                  </ion-card>
                </ng-template>
              </swiper>
            </ng-container>

          </ng-container>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="(list$ | async) as list">
        <ng-container *ngIf="(getStatus() | async) as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 0; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">

              <ng-container *ngIf="list?.length > 0; else noData">

                <div class="margin-bottom-10">
                  <h2 class="text-color-light">{{'COMMON.ALL_LIST' | translate}}</h2>
                </div>

                <ion-card class="ion-activatable ripple-parent item-card" *ngFor="let item of list; let i = index; trackBy: trackById" (click)="openSingleCardModal(item)">
                  <div class="displays-around text-color-light heigth-70">
                    <div class="width-20">
                      <ion-img [src]="getImage(item)" loading="lazy" (ionError)="errorImage($event)"></ion-img>
                    </div>

                    <div class="width-60">
                      {{ sliceLongText(getTitle(item?.attributes?.titles)) }}
                    </div>

                    <div class="width-10">
                      <ion-icon name="chevron-forward-outline"></ion-icon>
                    </div>
                  </div>
                  <!-- RIPLE EFFECT  -->
                  <ion-ripple-effect></ion-ripple-effect>
                </ion-card>

                <!-- INFINITE SCROLL  -->
                <ng-container *ngIf="getTotalCount() | async as total">
                  <ng-container *ngIf="list?.length < total">
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

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <div class="error-serve heigth-mid">
          <div>
            <span>
              <!-- <ion-icon class="text-color-light max-size" name="cloud-offline-outline"></ion-icon> -->
              <img [src]="'assets/images/error.png'"/>
            </span>
            <br>
            <span class="text-color-ligth">{{'COMMON.ERROR' | translate}}</span>
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
            <span class="text-color-light">{{'COMMON.NORESULT' | translate}}</span>
          </div>
        </div>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <div class="pending-div">
          <ion-spinner class="loadingspinner"></ion-spinner>
        </div>
      </ng-template>

    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  gotToTop = gotToTop;
  emptyObject = emptyObject;
  trackById = trackById;
  getObjectKeys = getObjectKeys;
  errorImage = errorImage;
  sliceLongText = sliceLongText;
  sliceText = sliceText;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  transitionPending = false;
  showButton = false;
  search = new FormControl('');
  perPage: number = this._coreConfig.getPerPage();
  infiniteScrollTrigger = new EventEmitter<{page?:number, type:string, filter?:Filter}>();
  statusComponent: {page?:number, type:string, filter?:Filter} = {
    page:0,
    type:'Anime',
    filter: {}
  };


  list$ = this.infiniteScrollTrigger.pipe(
    startWith(this.statusComponent),
    tap(({page, type, filter}) => {
      if(type === 'Anime') this.store.dispatch(AnimeActions.loadAnimeList({page, filter}))
      else this.store.dispatch(MangaActions.loadMangaList({page, filter}))
    }),
    switchMap(({type}) => {
      return (type === 'Anime')
      ? this.store.select(fromAnime.getAnimeList)
      : this.store.select(fromManga.getMangaList)
    })
    // ,map(() => [])
    // ,tap(d => console.log(d))
  );

  trendingList$ = this.infiniteScrollTrigger.pipe(
    startWith(this.statusComponent),
    switchMap(({type}) => {
      return type === 'Anime'
        ? this.store.select(fromAnime.getTrendingAnimeList)
        : this.store.select(fromManga.getTrendingMangaList)
    })
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    private _coreConfig: CoreConfigService,
    public platform: Platform,
    public modalController: ModalController
  ) { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.statusComponent = {...this.statusComponent,  page:0, filter:{ ...this.statusComponent.filter, text: this.search.value } };
    this.infiniteScrollTrigger.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.statusComponent = {...this.statusComponent, page:0, filter:{...this.statusComponent.filter, text: ''} };
    this.infiniteScrollTrigger.next(this.statusComponent);
    if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      if(this.statusComponent.type === 'Anime'){
        this.store.dispatch(AnimeActions.loadTrendingAnimeList())
      }
      else{
        this.store.dispatch(MangaActions.loadTrendingMangaList())
      }

      this.search.reset();
      this.statusComponent = { ...this.statusComponent, page: 0, filter: {}};
      this.infiniteScrollTrigger.next(this.statusComponent);
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = false;
      event.target.complete();
    }, 500);
  }

  //SEGMENT
  segmentChanged(event): void{
    this.transitionPending = true;
    setTimeout(() => this.transitionPending = false ,0);
    this.content.scrollToTop();
    this.search.reset();
    this.statusComponent = { page: 0, type: event?.detail?.value, filter:{} };
    this.infiniteScrollTrigger.next(this.statusComponent);
  }

  getImage(item: AnimeManga, option?:boolean): string{
    const { attributes = null } = item || {};
    const { posterImage = null } = attributes || {};
    return !option
      ? posterImage?.tiny || posterImage?.small || posterImage?.medium || posterImage?.large || posterImage?.original
      : posterImage?.original || posterImage?.large || posterImage?.medium || posterImage?.small || posterImage?.tiny;
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

  // SLIDES CONFIG
  getSliderConfig(info:any): SwiperOptions {
    return {
      slidesPerView: info?.length > 1 ? 2 : 1,
      spaceBetween: 40,
      // freeMode: true,
      pagination:{ clickable: true },
      lazy: true,
      preloadImages: false
    };
  }

  // SHOW SINGLE CARD
  async openSingleCardModal(item: AnimeManga) {
    const modal = await this.modalController.create({
      component: CardModalComponent,
      componentProps:{
        item
      }
    });
    return await modal.present();
  }

  getTotalCount(): any {
    return this.statusComponent.type === 'Anime'
    ? this.store.select(fromAnime.getTotalCount)
    : this.store.select(fromManga.getTotalCount)
  }

  getStatus(): Observable<EntityStatus>{
    return this.statusComponent.type === 'Anime'
    ? this.store.select(fromAnime.getStatus).pipe(shareReplay(1))
    : this.store.select(fromManga.getStatus).pipe(shareReplay(1))
  }

  getTrendingStatus(): Observable<EntityStatus>{
    return this.statusComponent.type === 'Anime'
    ? this.store.select(fromAnime.getTrendingStatus)
    : this.store.select(fromManga.getTrendingStatus)
  }

  getTitle(titles: any): string{
    return titles['en'] || titles['en_jp'] || titles['en_us'] || titles['en_cn'] || '';
  }



}
