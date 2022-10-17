import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerModule } from '../spinner/spinner.module';
import { InfiniteScroll } from './infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpinnerModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    InfiniteScroll
  ],
  exports:[
    InfiniteScroll
  ]
})
export class InfiniteScrollModule {}
