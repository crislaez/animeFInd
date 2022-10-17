import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimeManga } from '@findAnime/shared/models';
import { errorImage } from '@findAnime/shared/utils/functions';

@Component({
  selector: 'app-episode-card',
  template: `
  <ion-card class="ion-activatable ripple-parent ion-card"
    (click)="openItemPopover.next(episode)">

    <ion-img [src]="getEpisodeChapterImage(episode)" loading="lazy" (ionError)="errorImage($event)"></ion-img>
    <ion-card-header class="ion-card-header font-medium">
      <!-- ANIME  -->
      <div *ngIf="episode?.attributes?.seasonNumber as seasonNumber">{{ 'COMMON.SEASON' | translate }} {{ seasonNumber }}</div>
      <div *ngIf="type === 'TV' && episode?.attributes?.number">{{ 'COMMON.EPISODE' | translate }} {{ episode?.attributes?.number }}</div>
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
  `,
  styleUrls: ['./episode-card.scss'],
})
export class EpisodeCardComponent {

  errorImage = errorImage;
  @Input() episode:AnimeManga;
  @Input() type:string;
  @Output() openItemPopover = new EventEmitter<AnimeManga>();

  constructor() { }


  getEpisodeChapterImage(item: AnimeManga): string{
    const { attributes = null } = item || {};
    const { thumbnail = null } = attributes || {};
    const { original = null } = thumbnail || {};
    return original || ''
  }

}
