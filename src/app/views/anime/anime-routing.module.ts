import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimePage } from './containers/anime.page';

const routes: Routes = [
  {
    path: '',
    component: AnimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimePageRoutingModule {}
