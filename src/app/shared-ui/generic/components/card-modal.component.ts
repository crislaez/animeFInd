import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { EpisodeActions, Filter, fromEpisode } from '@findAnime/shared/episode';
import { emptyObject, EntityStatus, errorImage, getObjectKeys, gotToTop, sliceText, smallSliceText, trackById } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga, Attributes } from '@findAnime/shared/utils/models';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
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

              <app-anime-info
                [item]="item"
                (filterType)="filterType(item?.attributes)">
              </app-anime-info>

              <ng-container *ngIf="(episodesOrChapters$ | async) as episodesOrChapters">
                <ng-container *ngIf="(status$ | async) as status">
                  <ng-container *ngIf="status !== 'pending' || statusComponent?.page !== 0; else loader">
                    <ng-container *ngIf="status !== 'error'; else serverError">
                      <ng-container *ngIf="episodesOrChapters?.length > 0; else noData">
                        <!-- EPISODES OR CHAPTERS  -->
                        <app-infinite-scroll-chapter
                          [episodesOrChapters]="episodesOrChapters"
                          [type]="statusComponent?.type"
                          [status]="status"
                          [total]="(totalCount$ | async)"
                          (loadDataTrigger)="loadData($event)"
                          (openItemPopover)="openItemPopover($event)">
                        </app-infinite-scroll-chapter>

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
  loadData({event, total}) {
    this.statusComponent = {...this.statusComponent, page: this.statusComponent?.page + this.perPage };

    if(this.statusComponent?.page >= total){
      if(this.ionInfiniteScroll) this.ionInfiniteScroll.disabled = true
    }

    this.infiniteScrollTrigger.next(this.statusComponent);
    event.target.complete();
  }

  getImage(item: AnimeManga, option: boolean): string{
    const { attributes = null } = item || {};
    const { posterImage = null, coverImage = null } = attributes || {};
    return option
      ? posterImage?.large || posterImage?.medium || posterImage?.original || posterImage?.tiny
      : coverImage?.large
  }

  getTitle(titles: any): string{
    return titles['en'] || titles['en_jp'] || titles['en_us'] || titles['en_cn'] || '';
  }

  filterType(attribute: Attributes): boolean{
    const { showType = null, episodeCount = null} = attribute || {};
    return ['TV', 'special', 'ONA']?.includes(showType) && episodeCount > 1 ? true : false
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
