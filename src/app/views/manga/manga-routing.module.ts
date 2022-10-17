import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaPage } from './containers/manga.page';

const routes: Routes = [
  {
    path: '',
    component: MangaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaPageRoutingModule {}
