import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { CardModalComponent } from '@findAnime/shared-ui/generic/components/card-modal.component';
import { AnimeActions, Filter, fromAnime } from '@findAnime/shared/anime';
import { fromManga, MangaActions } from '@findAnime/shared/manga';
import { emptyObject, EntityStatus, errorImage, getImage, getObjectKeys, getSliderConfig, getTitle, gotToTop, sliceLongText, sliceText, trackById } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models/index';
import { IonContent, IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap, tap } from 'rxjs/operators';



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
          <ng-container *ngIf="trendingStatus !== 'pending' && !transitionPending; else skeleton">
            <ng-container *ngIf="trendingStatus !== 'error'; else serverError">
              <ng-container *ngIf="trendingList?.length > 0; else noData">
                <!-- LAST SETS SLIDER  -->
                <app-swiper
                  [title]="'COMMON.TRENDING'"
                  [items]="trendingList"
                  [isSkeleton]="false"
                  (openSingleCardModal)="openSingleCardModal($event)">
                </app-swiper>
              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="(list$ | async) as list">
        <ng-container *ngIf="(getStatus() | async) as status">
          <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 0; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="list?.length > 0; else noData">
                <!-- LIST  -->
                <app-infinite-scroll
                  [list]="list"
                  [title]="'COMMON.ALL_LIST'"
                  [total]="getTotalCount() | async"
                  [status]="status"
                  (loadDataTrigger)="loadData($event)"
                  (openSingleCardModal)="openSingleCardModal($event)">
                </app-infinite-scroll>
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
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'10vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'10vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #skeleton>
        <app-swiper
          [title]="'COMMON.TRENDING'"
          [isSkeleton]="true">
        </app-swiper>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <app-spinner [top]="'20%'"></app-spinner>
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
  getSliderConfig = getSliderConfig;
  getTitle = getTitle;
  getImage = getImage;
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

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.statusComponent = {...this.statusComponent, page: this.statusComponent?.page + this.perPage };

    if(this.statusComponent?.page >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
    }

    this.infiniteScrollTrigger.next(this.statusComponent);
    event.target.complete();
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




}
