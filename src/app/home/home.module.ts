import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenericModule } from '@findAnime/shared-ui/generic/generic.module';
import { AnimeModule } from '@findAnime/shared/anime/anime.module';
import { MangaModule } from '@findAnime/shared/manga/manga.module';
import { SharedModule } from '@findAnime/shared/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { InfiniteScrollComponent } from './components/infinite-scroll.component';
import { HomePage } from './containers/home.page';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AnimeModule,
    MangaModule,
    SwiperModule,
    GenericModule,
    TranslateModule.forChild(),
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    InfiniteScrollComponent
  ]
})
export class HomePageModule {}
