import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimeManga } from '@findAnime/shared/models';
import { errorImage, isNotEmptyObject, trackById } from '@findAnime/shared/utils/functions';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-item-popover',
  template:`
  <ion-content class="modal-wrapper">
    <ion-header class="ion-no-border">
      <ion-toolbar>
      <ion-title class="text-color-light">{{ getTitle(item?.attributes?.titles)  }}</ion-title>
        <ion-buttons class="text-color-light" slot="end">
          <ion-button class="ion-button-close" fill="clear" (click)="dismissModal()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="displays-around height-100">
      <div class="container">
        <ng-container *ngIf="isNotEmptyObject(item); else noData">
          <ion-card class="modal-ion-card ">
            <ion-img class="modal-ion-card-image" [src]="getImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>

            <ion-card-content>
              <div class="ion-card-content-container displays-around text-color-ligth">
                <ng-container *ngFor="let item of iteratable; trackBy: trackById">
                  <ng-container *ngIf="itemAttributes?.[item?.field] as field">
                    <div
                      [ngClass]="{'width-90': item?.field === 'synopsis', 'width-40': item?.field !== 'synopsis'}"
                      class="mediun-size span-bold">
                      {{ item?.label | translate }}:
                    </div>
                    <div
                      [ngClass]="{'width-90': item?.field === 'synopsis', 'width-40': item?.field !== 'synopsis'}"
                      class="mediun-size">
                      {{ field }}
                      <ng-container *ngIf="item?.field === 'length'">{{ 'COMMON.MINUTES' | translate }}</ng-container>
                    </div>
                  </ng-container>
                </ng-container>
              </div>
            </ion-card-content>
          </ion-card>
        </ng-container>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="error-serve heigth-mid">
            <div>
              <span>
                <!-- <ion-icon class="text-color-light max-size" name="clipboard-outline"></ion-icon> -->
                <img [src]="'assets/images/empty.png'"/>
              </span>
              <br>
              <span class="text-color-light">{{'COMMON.NORESULT_ONLY' | translate}}</span>
            </div>
          </div>
        </ng-template>
      </div>
    </div>

  </ion-content>
  `,
  styleUrls: ['./item-popover.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemPopoverComponent {

  trackById = trackById;
  errorImage = errorImage;
  isNotEmptyObject = isNotEmptyObject;
  @Input() item: AnimeManga;

  iteratable = [
    {id:1, label:'COMMON.DURATION', field:'length'},
    {id:2, label:'COMMON.AIR_DATE', field:'airdate' },
    {id:3, label:'COMMON.SEASON', field:'seasonNumber'},
    {id:4, label:'COMMON.EPISODE', field:'number'},
    {id:5, label:'COMMON.DESCRIPTION', field:'synopsis'},
  ];


  constructor(
    public modalController: ModalController
  ) { }


  get itemAttributes(){
    const { attributes = null } = this.item || {};
    return attributes || {}
  }

  dismissModal() {
    this.modalController.dismiss(false);
  }

  getTitle(titles: any): string{
    return !!titles ? titles['en'] || titles['en_jp'] || titles['en_us'] || titles['en_cn'] || '' : ''
  }

  getImage(item: AnimeManga, option: boolean): string{
    const { attributes = null } = item || {};
    const { thumbnail = null } = attributes || {};
    const { original = null } = thumbnail || {};
    return original || ''
  }




}
