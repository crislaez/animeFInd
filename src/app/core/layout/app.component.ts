import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template:`
  <ion-app >

    <!-- CABECERA  -->
    <ion-header class="ion-no-border">
      <ion-toolbar *ngIf="(currentSection$ | async) as currentSection">
        <!-- <ion-button *ngIf="currentSection !== 'COMMON.SET'" fill="clear" size="small" slot="start"  (click)="open()">
          <ion-menu-button class="text-color"></ion-menu-button>
        </ion-button> -->

        <!-- <ion-back-button *ngIf="currentSection === 'COMMON.SET'" class="text-color" slot="start" defaultHref="/home" [text]="''"></ion-back-button> -->

        <ion-title class="text-color-light ion-text-center" >{{ 'COMMON.TITLE' | translate }}</ion-title>

      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <!-- <ion-menu side="start" menuId="first" contentId="main">
      <ion-header>
        <ion-toolbar >
          <ion-title class="text-color-light" >{{ 'COMMON.MENU' | translate}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content >
        <ion-item class="text-second-color" *ngFor="let item of lateralMenu;  trackBy: trackById" [routerLink]="['/'+item?.link]" (click)="openEnd()">{{ item?.text | translate }}</ion-item>
      </ion-content >
    </ion-menu> -->

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

    <!-- TAB FOOTER  -->
    <!-- <ion-tabs *ngIf="currentSection$ | async as currentSection" class="ion-no-border">
      <ion-tab-bar [translucent]="true" slot="bottom">
        <ion-tab-button [ngClass]="{'active-class': ['home']?.includes(currentSection)}" class="text-color-light" [routerLink]="['home']">
          <ion-icon name="document-text-outline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button [ngClass]="{'active-class': ['search']?.includes(currentSection)}" class="text-color-light" [routerLink]="['search']">
          <ion-icon name="search-outline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs> -->

  </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  currentSection$: Observable<string> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {}
      let route = url?.split('/')[1];
      return route || 'home';
    })
  );

  constructor(private router: Router) {}

}
