import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimeManga } from '@findAnime/shared/models';
import { trackById } from '@findAnime/shared/utils/functions';


@Component({
  selector: 'app-info-card',
  template: `
  <div class="displays-around item-wrapper">
    <ng-container *ngFor="let item of iteratable; trackBy: trackById">
      <ng-container *ngIf="item?.condition">
        <!-- LABEL  -->
        <div
          [ngClass]="{'width-40': item?.field !== 'synopsis' , 'width-90': item?.field === 'synopsis'}"
          class="mediun-size span-bold">
          {{ item?.label | translate }}:
        </div>

        <!-- VALUES  -->
        <div
          *ngIf="['startDate', 'createdAt', 'endDate']?.includes(item?.field)"
          class="width-40 mediun-size">
          <ng-container *ngIf="attributes?.[item?.field] as value">{{ value | date: 'MMM d, y' }}</ng-container>
          <ng-container *ngIf="!attributes?.[item?.field]"> - </ng-container>
        </div>

        <div
          *ngIf="!['startDate', 'createdAt', 'endDate', 'synopsis']?.includes(item?.field)"
          class="width-40 mediun-size">
          {{ (attributes?.[item?.field] || '-') }}
          <ng-container *ngIf="attributes?.[item?.field] && ['episodeLength']?.includes(item?.field)">{{ 'COMMON.MINUTES' | translate }}</ng-container>
          <ng-container *ngIf="attributes?.[item?.field] && ['averageRating']?.includes(item?.field)"> % </ng-container>
        </div>

        <div
          *ngIf="['synopsis']?.includes(item?.field)"
          class="width-90 mediun-size">
          {{ itemDescription }}
          <div class="width-max displays-end">
            <ion-button
              (click)="showMore = !showMore"
              class="class-ion-button">
              {{ (!showMore ? 'COMMON.SHEE_MORE' : 'COMMON.SHEE_LEES') | translate }}
            </ion-button>
          </div>
        </div>
      </ng-container>
    </ng-container>
  </div>
  `,
  styleUrls: ['./info-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoCardComponent {

  trackById = trackById;
  @Input() set item(value: AnimeManga){
    this.animeManga = value;
    this.iteratable = [
      {id:1, label:'COMMON.CREATE', field:'startDate', condition:true},
      {id:2, label:'COMMON.RATING_RANK', field:'ratingRank', condition: this.attributes?.showType === 'TV'},//ratingRank
      {id:3, label:'COMMON.FINISH_DATE', field:'endDate', condition: !['movie']?.includes(this.attributes?.showType) && this.filterType && this.attributes?.mangaType !== 'manga' },
      {id:4, label:'COMMON.STATUS', field:'status', condition:true},
      {id:5, label:'COMMON.AVERAGE_RATING', field:'averageRating', condition:true},
      {id:6, label:'COMMON.AGE_RATING_GUIDE', field:'ageRatingGuide', condition:true},
      {id:7, label:'COMMON.NUMBER_EPISODES', field:'episodeCount', condition: this.attributes?.showType === 'TV'},
      {id:8, label:'COMMON.DURATION', field:'episodeLength', condition: this.attributes?.showType === 'TV'},
      {id:9, label:'COMMON.DESCRIPTION', field:'synopsis', condition:true}
    ];
  };

  animeManga: Partial<AnimeManga> = {};
  iteratable:{id:number, label:string, field:string, condition:boolean}[] = [];
  showMore = false;

  constructor() { }


  get attributes(){
    const { attributes = null} = this.animeManga || {};
    return attributes
  }

  get filterType(): boolean{
    const { attributes = null} = this.animeManga || {};
    const { showType = null, episodeCount = null} = attributes || {};
    return ['TV', 'special', 'ONA']?.includes(showType) && episodeCount > 1 ? true : false;
  }

  get itemDescription(){
    const { synopsis = null} = this.animeManga?.attributes || {};
    return !!this.showMore
            ? synopsis
            : synopsis?.slice(0, 30) + ' ...';
  }

}
// blob:https://www.youtube.com/89ee67bc-a159-459f-8913-e08918748a00¡
