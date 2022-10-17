import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaListPage } from './containers/manga-list.page';

const routes: Routes = [
  {
    path: '',
    component: MangaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaListPageRoutingModule {}
