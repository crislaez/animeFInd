
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityStatus, errorImage, trackById } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';

@Component({
  selector: 'app-infinite-scroll-chapter',
  template:`
    <div class="displays-around">
    <ion-card class="ion-activatable ripple-parent ion-card" *ngFor="let item of episodesOrChapters; let i = index; trackBy: trackById" (click)="openItemPopover.next(item)">
        <ion-img [src]="getEpisodeChapterImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>

        <ion-card-header class="ion-card-header font-medium">
          <!-- ANIME  -->
          <div *ngIf="item?.attributes?.seasonNumber as seasonNumber">{{ 'COMMON.SEASON' | translate }} {{ seasonNumber }}</div>
          <div *ngIf="type === 'TV' && item?.attributes?.number">{{ 'COMMON.EPISODE' | translate }} {{ item?.attributes?.number }}</div>
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
      <ng-container *ngIf="total">
        <ng-container *ngIf="episodesOrChapters?.length < total">
          <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event, total)">
            <ion-infinite-scroll-content>
              <app-spinner [top]="'0%'" *ngIf="$any(status) === 'pending'"></app-spinner>
            </ion-infinite-scroll-content>
          </ion-infinite-scroll>
        </ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['./infinite-scroll-chapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollChapterComponent {

  errorImage = errorImage;
  trackById = trackById;
  @Input() episodesOrChapters: AnimeManga[];
  @Input() type: string;
  @Input() total: number;
  @Input() status: EntityStatus;
  @Output() loadDataTrigger = new EventEmitter<{event, total}>();
  @Output() openItemPopover = new EventEmitter<AnimeManga>();

  constructor() { }


  getEpisodeChapterImage(item: AnimeManga, option: boolean): string{
    const { attributes = null } = item || {};
    const { thumbnail = null } = attributes || {};
    const { original = null } = thumbnail || {};
    return original || ''
  }

  loadData(event, total): void{
    this.loadDataTrigger.next({event, total})
  }

}
