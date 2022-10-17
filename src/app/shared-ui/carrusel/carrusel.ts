import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { errorImage, getImage, getSliderConfig, getTitle, trackById } from '@findAnime/shared/utils/functions';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-carrusel',
  template:`
  <ng-container *ngIf="!isSkeleton">
    <swiper #swiper effect="fade" [config]="getSliderConfig()" >
      <ng-template swiperSlide *ngFor="let item of items; trackBy: trackById" >
        <ion-card class="ion-activatable ripple-parent slide-ion-card" (click)="openSingleCardModal.next(item)" >
          <ion-img class="ion-card-image" [src]="getImage(item, false)" loading="lazy" (ionError)="errorImage($event)"></ion-img>

          <ion-card-header class="font-medium text-color-light">
            {{ getTitle(item?.attributes?.titles) }}
          </ion-card-header>

          <!-- RIPLE EFFECT  -->
          <ion-ripple-effect></ion-ripple-effect>
        </ion-card>
      </ng-template>
    </swiper>
  </ng-container>

  <ng-container *ngIf="isSkeleton">
    <swiper #swiper effect="fade" [config]="getSliderConfig()">
      <ng-template swiperSlide *ngFor="let item of [0,1,2]; trackBy: trackById">

        <ion-card class="ion-activatable ripple-parent slide-ion-card"  >
          <div class="div-image">
          </div>

          <ion-card-header class="font-medium text-color-light">
            <div class="div-p"></div>
          </ion-card-header>

          <!-- RIPLE EFFECT  -->
          <!-- <ion-ripple-effect></ion-ripple-effect> -->
        </ion-card>
      </ng-template>
    </swiper>
  </ng-container>
  `,
  styleUrls: ['./carrusel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarruselComponent {

  getTitle = getTitle;
  getImage = getImage;
  trackById = trackById;
  errorImage = errorImage;
  getSliderConfig = getSliderConfig;
  @Input() items: any[];
  @Input() isSkeleton: boolean;
  @Output() openSingleCardModal = new EventEmitter<any>()


  constructor() { }


}
