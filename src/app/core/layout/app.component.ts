import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotificationModal } from '@findAnime/shared-ui/notification-modal/notification-modal';
import { ModalController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <ion-header class="ion-no-border">
      <ion-toolbar *ngIf="(currentSection$ | async) as currentSection">
        <ion-back-button
          *ngIf="!isNotShowBackButtons?.includes(currentSection)"
          class="text-color"
          slot="start"
          [defaultHref]="redirectTo(currentSection)"
          [text]="''">
        </ion-back-button>

        <ion-title class="text-color-light">
          {{ 'COMMON.TITLE' | translate }}
        </ion-title>

        <ion-icon
          class="text-color"
          slot="end"
          name="ellipsis-horizontal-outline"
          (click)="presentModal()">
        </ion-icon>

      </ion-toolbar>
    </ion-header>

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

    <!-- TAB FOOTER  -->
    <ion-tabs *ngIf="currentSection$ | async as currentSection">
      <ion-tab-bar [translucent]="true" slot="bottom">
        <ion-tab-button
          [ngClass]="{'active-class': currentSection?.includes('anime')}"
          class="text-color-light"
          [routerLink]="['anime']">
          <ion-icon name="videocam-outline"></ion-icon>
          <ion-label>{{ 'COMMON.ANIME' | translate }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          [ngClass]="{'active-class': currentSection?.includes('manga')}"
          class="text-color-light"
          [routerLink]="['manga']">
          <ion-icon name="book-outline"></ion-icon>
          <ion-label>{{ 'COMMON.MANGA' | translate }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  isNotShowBackButtons = ['anime','manga'];
  currentSection$ = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {};

      const [ , route = null, secondRouter = null] = url?.split('/') || [];
      if(secondRouter) return url
      return route || 'anime';
    })
  );


  constructor(
    private router: Router,
    private modalController: ModalController,
  ) { }


  redirectTo(currentSection:any): string{
    if(currentSection?.includes('anime')) return '/anime'
    if(currentSection?.includes('manga')) return '/manga'
    return '/anime';
  }

  // OPEN FILTER MODAL
  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationModal,
    });

    modal.present();
    await modal.onDidDismiss();
  }

}

