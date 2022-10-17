import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryEffects } from './effects/category.effects';
import * as fromCategory from './reducers/category.reducer';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    EffectsModule.forFeature([CategoryEffects]),
  ]
})
export class CategoryModule {}
