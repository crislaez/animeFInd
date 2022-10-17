import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'anime',
    loadChildren: () => import('./views/anime/anime.module').then( m => m.AnimePageModule)
  },
  {
    path: 'anime/list',
    loadChildren: () => import('./views/anime-list/anime-list.module').then( m => m.AnimeListPageModule)
  }
  ,
  {
    path: 'manga',
    loadChildren: () => import('./views/manga/manga.module').then( m => m.MangaPageModule)
  },
  {
    path: 'manga/list',
    loadChildren: () => import('./views/manga-list/manga-list.module').then( m => m.MangaListPageModule)
  },
  {
    path: '**',
    redirectTo: 'anime',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
