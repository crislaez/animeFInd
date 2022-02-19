import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { emptyObject, errorImage } from '@findAnime/shared/utils/helpers/functions';
import { AnimeManga } from '@findAnime/shared/utils/models';
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
        <ng-container *ngIf="emptyObject(item); else noData">
          <ion-card class="modal-ion-card ">
            <ion-img class="modal-ion-card-image" [src]="getImage(item, true)" loading="lazy" (ionError)="errorImage($event)"></ion-img>

            <ion-card-content>
              <div class="ion-card-content-container displays-around text-color-ligth">

                <ng-container *ngIf="item?.attributes?.length as length">
                  <div class="width-40 mediun-size span-bold">{{ 'COMMON.DURATION' | translate }}:</div>
                  <div class="width-40 mediun-size">{{ length }} {{ 'COMMON.MINUTES' | translate }}</div>
                </ng-container>

                <ng-container *ngIf="item?.attributes?.airdate as airdate">
                  <div class="width-40 mediun-size span-bold">{{ 'COMMON.AIR_DATE' | translate }}</div>
                  <div class="width-40 mediun-size">{{ airdate | date: 'MMM d, y' }}</div>
                </ng-container>

                <ng-container *ngIf="item?.attributes?.seasonNumber as seasonNumber">
                  <div class="width-40 mediun-size span-bold">{{ 'COMMON.SEASON' | translate }}</div>
                  <div class="width-40 mediun-size">{{ seasonNumber }}</div>
                </ng-container>

                <ng-container *ngIf="item?.attributes?.number as number">
                  <div class="width-40 mediun-size span-bold">{{ 'COMMON.EPISODE' | translate }}</div>
                  <div class="width-40 mediun-size">{{ number }}</div>
                </ng-container>

                <ng-container *ngIf="item?.attributes?.synopsis as synopsis">
                  <div class="width-90 mediun-size text-center span-bold">{{ 'COMMON.DESCRIPTION' | translate }}</div>
                  <div class="width-90 mediun-size">{{ synopsis }}</div>
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
  styleUrls: ['./item-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemPopoverComponent {

  emptyObject = emptyObject;
  errorImage = errorImage;
  @Input() item: AnimeManga;


  constructor(
    public modalController: ModalController
  ) { }


  // ngOnInit(): void{
  //   console.log(this.item)
  // }

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
