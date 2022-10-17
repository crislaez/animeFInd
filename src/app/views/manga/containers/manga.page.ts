import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { InfoModalComponent } from '@findAnime/shared-ui/info-modal/info-modal';
import { MangaActions } from '@findAnime/shared/manga';
import { AnimeManga } from '@findAnime/shared/models';
import { gotToTop, trackById } from '@findAnime/shared/utils/functions';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromMangaPage from '../selectors/manga.page.selectors';


@Component({
  selector: 'app-manga',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
      <div class="empty-div-50"></div>

      <h1 class="text-color-light padding-top-10">{{ 'COMMON.MANGA' | translate }}</h1>

      <div class="displays-center width-max">
      </div>
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="mangaInitData$ | async as mangaInitData">
        <ng-container *ngFor="let item of iteratable; let i = index; trackBy: trackById">
          <div class="div-center margin-top-20">
            <h2 class="text-color-light margin-left-5">{{ item?.title | translate }}</h2>
            <span *ngIf="i === 0" [routerLink]="['/manga/list']" class="text-color-primary">{{ 'COMMON.SHEE_ALL' | translate }}</span>
          </div>

          <ng-container *ngIf="mangaInitData?.[item?.status] !== 'pending'; else skeleton">
            <ng-container *ngIf="mangaInitData?.[item?.status] !== 'error'; else serverError">
              <ng-container *ngIf="mangaInitData?.[item?.value]?.length > 0; else noData">

                <app-carrusel
                  [items]="mangaInitData?.[item?.value]"
                  [isSkeleton]="false"
                  (openSingleCardModal)="openSingleCardModal($event)">
                </app-carrusel>

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
        <app-carrusel
          [title]="'COMMON.TRENDING'"
          [isSkeleton]="true">
        </app-carrusel>
      </ng-template>

    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

  </ion-content>
  `,
  styleUrls: ['./manga.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangaPage {

  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton = false;
  sumPage = this._coreConfig.getPerPage();
  iteratable = [
    {id:1, title:'COMMON.TRENDING', status:'trendingStatus', value:'trendingManga'},
    {id:1, title:'COMMON.MOST_ANTICIPATED', status:'mostAnticipatedStatus', value:'mostAnticipatedManga'},
    {id:1, title:'COMMON.BEST_EVALUATED', status:'bestEvaluatedStatus', value:'bestEvaluatedManga'},
    {id:1, title:'COMMON.MOST_POPULAR', status:'mostPopularStatus', value:'mostPopularManga'}
  ];

  mangaInitData$ = this.store.select(fromMangaPage.selectMangaPageInit)


  constructor(
    private store: Store,
    public platform: Platform,
    private _coreConfig: CoreConfigService,
    public modalController: ModalController
  ) { }


  // REFRESH
  doRefresh(event) {
    this.store.dispatch(MangaActions.loadTrendingMangaList());
    this.store.dispatch(MangaActions.loadMostAnticipatedMangaList());
    this.store.dispatch(MangaActions.loadBestEvaluatedMangaList());
    this.store.dispatch(MangaActions.loadMostPopularMangaList());

    event.target.complete();
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
