import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from './../notification/notification.module';
import { ChapterEffects } from './effects/chapter.effects';
import * as fromChapter from './reducers/chapter.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromChapter.chapterFeatureKey, fromChapter.reducer),
    EffectsModule.forFeature([ChapterEffects]),
  ]
})
export class ChapterModule { }
