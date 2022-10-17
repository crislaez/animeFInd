import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationModalModule } from '@findAnime/shared-ui/notification-modal/notification-modal.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './layout/app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    IonicModule,
    NotificationModalModule,
    TranslateModule.forChild(),
    RouterModule
  ]
})
export class CoreModule { }
