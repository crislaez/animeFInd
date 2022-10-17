import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ItemPopoverComponent } from './item-popover';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    ItemPopoverComponent
  ],
  exports:[
    ItemPopoverComponent
  ]
})
export class ItemPopoverModule {}
