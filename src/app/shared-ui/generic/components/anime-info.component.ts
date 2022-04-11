import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimeManga } from '@findAnime/shared/utils/models';

@Component({
  selector: 'app-anime-info',
  template:`
    <div class="displays-around item-wrapper">
      <div class="width-90 big-size-medium text-center span-bold">{{ item?.attributes?.showType || item?.attributes?.subtype}}</div>

      <div class="width-40 mediun-size span-bold">{{ 'COMMON.CREATE' | translate }}:</div>
      <div class="width-40 mediun-size">{{ (item?.attributes?.startDate || item?.attributes?.createdAt) | date: 'MMM d, y' }}</div>

      <ng-container *ngIf="item?.attributes?.endDate && !['movie']?.includes(item?.attributes?.showType) && filterType && item?.attributes?.mangaType !== 'manga'">
        <div class="width-40 mediun-size span-bold">{{ 'COMMON.FINISH_DATE' | translate }}:</div>
        <div class="width-40 mediun-size">{{ item?.attributes?.endDate | date: 'MMM d, y' }}</div>
      </ng-container>

      <ng-container *ngIf="!['movie', 'special']?.includes(item?.attributes?.showType)">
        <div class="width-40 mediun-size span-bold">{{ 'COMMON.STATUS' | translate }}:</div>
        <div class="width-40 mediun-size">{{ item?.attributes?.status }}</div>
      </ng-container>

      <ng-container *ngIf="item?.attributes?.averageRating as averageRating">
        <div class="width-40 mediun-size span-bold">{{ 'COMMON.AVERAGE_RATING' | translate }}:</div>
        <div class="width-40 mediun-size">{{ averageRating }}</div>
      </ng-container>

      <ng-container *ngIf="item?.attributes?.ageRatingGuide as ageRatingGuide">
        <div class="width-40 mediun-size span-bold">{{ 'COMMON.AGE_RATING_GUIDE' | translate }}:</div>
        <div class="width-40 mediun-size">{{ ageRatingGuide }}</div>
      </ng-container>

      <!-- ANIME  -->
      <ng-container *ngIf="item?.attributes?.episodeCount && item?.attributes?.showType === 'TV'">
        <div class="width-40 mediun-size span-bold">{{ 'COMMON.NUMBER_EPISODES' | translate }}:</div>
        <div class="width-40 mediun-size">{{ item?.attributes?.episodeCount }}</div>
      </ng-container>
      <!-- ****  -->

      <ng-container *ngIf="item?.attributes?.episodeLength">
        <div class="width-40 mediun-size span-bold">{{ 'COMMON.DURATION' | translate }}:</div>
        <div class="width-40 mediun-size">{{ item?.attributes?.episodeLength }} {{ 'COMMON.MINUTES' | translate }}</div>
      </ng-container>

      <!-- MANGA  -->
      <!-- ****  -->

      <!-- DESCRIPTION  -->
      <div class="width-90 mediun-size text-center span-bold">{{ 'COMMON.DESCRIPTION' | translate }}</div>
      <div class="width-90 mediun-size">{{ item?.attributes?.synopsis }}</div>
    </div>
  `,
  styleUrls: ['./anime-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimeInfoComponent {

  @Input() item: AnimeManga;
  @Input() filterType: any;


  constructor() { }


}
