import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimeManga } from '@findAnime/shared/models';
import { errorImage, getImage, getTitle, sliceText } from '@findAnime/shared/utils/functions';

@Component({
  selector: 'app-item-list',
  template: `
  <ion-card class="ion-activatable ripple-parent card-card displays-around"
    (click)="openSingleCardModal.next(animeManga)"
    >
    <div class="card-title displays-around text-color">
      <div class="card-title-div span-bold">{{ title }}</div>
      <!-- <div class="card-title-icon" (click)="presentPopover($event, card)">
        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
      </div> -->
    </div>

    <div class="card-item displays-around" >
      <div>
        <ion-chip *ngIf="animeManga?.attributes?.averageRating as averageRating">
          <ion-label class="text-color">{{ averageRating }} %</ion-label>
        </ion-chip>

        <ion-chip *ngIf="animeManga?.attributes?.ratingRank as ratingRank">
          <ion-label class="text-color">{{ 'COMMON.RANK' | translate }}: {{ ratingRank }}
          </ion-label>
        </ion-chip>

        <!-- <ion-chip *ngIf="selectedSetCard?.set_price as set_price">
          <ion-label class="text-color-four span-bold">{{ set_price }} $</ion-label>
        </ion-chip> -->
      </div>

      <div >
        <ion-img loading="lazy" [src]="getImage(animeManga, false)" [alt]="animeManga?.attributes?.slug" (ionError)="errorImage($event)"></ion-img>
      </div>


    </div>

    <!-- RIPLE EFFECT  -->
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./item-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent {

  getImage = getImage;
  getTitle = getTitle;
  sliceText = sliceText;
  errorImage = errorImage
  @Input() animeManga: AnimeManga;
  @Output() openSingleCardModal = new EventEmitter<AnimeManga>();


  constructor() { }


  get title(){
    const { attributes = null } = this.animeManga || {};
    const { titles = null } = attributes || {};
    const { en = null, en_jp = null, ja_jp = null } = titles || {};

    // console.log('animeManga => ', this.animeManga )
    // console.log('attributes => ', attributes)
    // console.log('titles => ', titles)
    return en ?? en_jp ?? ja_jp ?? '';
  }


}
