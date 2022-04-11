import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { errorImage, getImage, getSliderConfig, getTitle, sliceText, trackById } from '@findAnime/shared/utils/helpers/functions';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-swiper',
  template:`
  <div class="margin-bottom-10 width-90-auto">
    <h2 class="text-color-light">{{ title | translate }}</h2>
  </div>

  <ng-container *ngIf="!isSkeleton">
    <swiper #swiper effect="fade" [config]="getSliderConfig(items)" >
      <ng-template swiperSlide *ngFor="let item of items; trackBy: trackById" >
        <ion-card class="ion-activatable ripple-parent slide-ion-card" (click)="openSingleCardModal.next(item)" >
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

  <ng-container *ngIf="isSkeleton">
    <swiper #swiper effect="fade" [config]="getSliderConfig([0,1])">
      <ng-template swiperSlide *ngFor="let item of [0,2]">

        <ion-card class="ion-activatable ripple-parent slide-ion-card"  >
          <ion-img >
            <ion-skeleton-text animated style="width: 20%"></ion-skeleton-text>
          </ion-img>
          <ion-card-header class="font-medium text-color-light">
            <ion-skeleton-text animated ></ion-skeleton-text>
          </ion-card-header>
        </ion-card>

      </ng-template>
    </swiper>
  </ng-container>
  `,
  styleUrls: ['./swiper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperComponent {

  getSliderConfig = getSliderConfig;
  sliceText = sliceText;
  trackById = trackById;
  errorImage = errorImage;
  getTitle = getTitle;
  getImage = getImage;
  @Input() title: string;
  @Input() items: any[];
  @Input() isSkeleton: boolean;
  @Output() openSingleCardModal = new EventEmitter<any>()


  constructor() { }


}
