import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '@findAnime/shared/category';
import { isNotEmptyObject } from '@findAnime/shared/utils/functions';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-filter-modal',
  template:`
  <ion-content class="modal-wrapper">

    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons class="text-color-light" slot="end">
          <ion-button class="ion-button-close" fill="clear" (click)="dismissModal()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="displays-around height-100">

      <ng-container *ngIf="categories?.length > 0" >
        <ion-item class="item-select font-medium ">
          <ion-label>{{'FILTERS.BY_CATEGORIES' | translate}}</ion-label>
          <ion-select (ionChange)="changeFilter($any($event), 'categories')" [value]="inputFilter || ''" interface="action-sheet">
            <ion-select-option [value]="''">{{ 'COMMON.ALL' | translate }}</ion-select-option>
            <ion-select-option *ngFor="let category of categories" [value]="category?.value">{{ category?.label }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ng-container>

    </div>

  </ion-content>
  `,
  styleUrls: ['./filter-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModal {

  isNotEmptyObject = isNotEmptyObject;
  @Input() inputFilter: any
  @Input() categories: Category[];


  constructor(
    public modalController: ModalController
  ) { }


  changeFilter({detail: {value}}, filter): void{
    this.modalController.dismiss({
      // ...(this.inputFilter ?? {}),
      [filter]:value
    });
  }

  dismissModal() {
    this.modalController.dismiss(false);
  }


}
