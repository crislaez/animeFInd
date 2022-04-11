import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityStatus, errorImage, getImage, getTitle, sliceLongText, trackById } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';


@Component({
  selector: 'app-infinite-scroll',
  template:`
    <div class="margin-bottom-10 width-90-auto">
      <h2 class="text-color-light">{{title | translate}}</h2>
    </div>

    <ion-card class="ion-activatable ripple-parent item-card" *ngFor="let item of list; let i = index; trackBy: trackById" (click)="openSingleCardModal.next(item)">
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
    <ng-container *ngIf="total as total">
      <ng-container *ngIf="list?.length < total">
        <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
          <ion-infinite-scroll-content >
            <app-spinner [top]="'0%'" *ngIf="$any(status) === 'pending'"></app-spinner>
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent {

  sliceLongText = sliceLongText;
  getImage = getImage;
  errorImage = errorImage;
  getTitle = getTitle;
  trackById = trackById;
  @Input() list: AnimeManga[];
  @Input() total: number;
  @Input() title: string;
  @Input() status: EntityStatus;
  @Output() loadDataTrigger = new EventEmitter<{event: any, total: number}>()
  @Output() openSingleCardModal = new EventEmitter<AnimeManga>();


  constructor() { }


  loadData(event, total): void{
    this.loadDataTrigger.next({event, total})
  }
}
