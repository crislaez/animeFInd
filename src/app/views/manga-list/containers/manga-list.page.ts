import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { FilterModal } from '@findAnime/shared-ui/filter-modal/filter-modal';
import { InfoModalComponent } from '@findAnime/shared-ui/info-modal/info-modal';
import { Category, fromCategory } from '@findAnime/shared/category';
import { fromManga, MangaActions } from '@findAnime/shared/manga';
import { AnimeManga } from '@findAnime/shared/models';
import { gotToTop, trackById } from '@findAnime/shared/utils/functions';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { MangaListComponentState } from '../model';


@Component({
  selector: 'app-manga-list',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
      <div class="empty-div-50"></div>

      <h1 class="text-color-light padding-top-10">{{ 'COMMON.MANGA' | translate }}</h1>

      <div class="displays-center width-max">
        <ng-container *ngIf="(status$ | async) !== 'pending'">
          <!-- FORM  -->
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>

          <!-- FILTER  -->
          <ion-button
            *ngIf="(categories$ | async) as categories"
            (click)="presentModal(categories)"
            class="displays-center class-ion-button" >
            <ion-icon name="options-outline"></ion-icon>
          </ion-button>
        </ng-container>
      </div>
    </div>


    <div class="container components-background-dark">
      <!-- MANGA LIST -->
      <div class="div-center margin-top-20">
        <h2 class="text-color-light margin-left-5">{{ 'COMMON.LIST' | translate }}</h2>
      </div>

      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' || componentStatus?.page > 0; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="info?.mangaList?.length > 0; else noData">

                <app-item-list
                  *ngFor="let anime of info?.mangaList; trackBy: trackById"
                  [animeManga]="anime"
                  (openSingleCardModal)="openSingleCardModal($event)">
                </app-item-list>

                <app-infinite-scroll
                  [slice]="info?.mangaList?.length"
                  [status]="status"
                  [total]="info?.total"
                  (loadDataTrigger)="loadData($event, info?.page)">
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
  styleUrls: ['./manga-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangaListPage {

  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  search = new FormControl(null);
  showButton = false;
  sumPage = this._coreConfig.getPerPage();

  categories$ = this.store.select(fromCategory.selectCategories);
  status$ = this.store.select(fromManga.selectStatus).pipe(shareReplay(1));
  trigger = new EventEmitter<MangaListComponentState>()
  componentStatus: MangaListComponentState = {
    page: 0,
    filter: {},
    reload: false
  };

  info$ = this.trigger.pipe(
    startWith(this.componentStatus),
    concatLatestFrom(() => this.store.select(fromManga.selectFilters)),
    tap(([{page, reload, filter}, storeFilters]) => {

      if(!reload ){
        const { text = null, categories = null } = storeFilters || {};
        this.search.setValue(text);
        this.componentStatus = {
          ...this.componentStatus,
          filter:{
            ...(text ? {text} : {text}),
            ...(categories ? {categories} : {categories})
          }
        };
      }

      if(!!reload || page > 0){
        this.store.dispatch(MangaActions.loadMangaList({page, filter}))
      }
    }),
    switchMap(() =>
      this.store.select(fromManga.selectMangaList).pipe(
        concatLatestFrom(() => [
          this.store.select(fromManga.selectPage),
          this.store.select(fromManga.selectTotalCount)
        ]),
        map(([mangaList = [], page = 0, total = 0]) => ({mangaList, page, total}))
      )
    )
    // ,tap(d => console.log(d))
  );


  constructor(
    private store: Store,
    public platform: Platform,
    private _coreConfig: CoreConfigService,
    public modalController: ModalController
  ) { }


  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = {
      ...this.componentStatus,
      filter:{
        ...this.componentStatus?.filter,
        text: this.search?.value
      },
      page: 0,
      reload: true
    };
    this.trigger.next(this.componentStatus);
  }

  // DELETE SEARCH
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = {
      ...this.componentStatus,
      filter:{
        ...this.componentStatus?.filter,
        text: undefined
      },
      page: 0,
      reload: true
    };
    this.trigger.next(this.componentStatus);
  }

  // REFRESH
  doRefresh(event) {
    this.search.reset();
    this.componentStatus = { page: 0, filter: {}, reload:true};
    this.trigger.next(this.componentStatus);
    event.target.complete();
  }

  // INIFINITE SCROLL
  loadData({event, total}, storePage: number) {
    this.componentStatus = {...this.componentStatus, page: (storePage + this.sumPage) };
    this.trigger.next(this.componentStatus);
    event.target.complete();
  }

  // OPEN FILTER MODAL
  async presentModal(categories: Category[]) {
    const modal = await this.modalController.create({
      component: FilterModal,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        inputFilter: this.componentStatus?.filter?.categories,
        categories,
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.2,
    });

    modal.present();

    const { data = null } = await modal.onDidDismiss();
    if(!data || Object.keys(data || {})?.length === 0) return;

    this.componentStatus = {
      ...this.componentStatus,
      filter:{
        ...(this.componentStatus?.filter ?? {}),
        ...(data ?? {}),
      },
      reload:true
    };
    this.trigger.next(this.componentStatus)
  }

  // SHOW SINGLE CARD
  async openSingleCardModal(item: AnimeManga) {
    const modal = await this.modalController.create({
      component: InfoModalComponent,
      componentProps:{
        item
      }
    });
    return await modal.present();
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }



}
// https://www.crunchyroll.com/one-piece
// https://beta.crunchyroll.com/es/series/G4PH0WXVJ/spy-x-family
