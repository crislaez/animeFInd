import { combineReducers } from "@ngrx/store";
import * as fromMangaList from "./manga.reducer";
import * as fromTrendignManga from "./trending.reducer";
import * as fromBestEvaluatedAnime from './best-evaluated.reducer';
import * as fromMostAnticipatedAnime from './most-anticipated.reducer';
import * as fromMostPopular from './most-popular.reducer';

export const combineFeatureKey = 'manga';

export interface CombineState {
  [fromMangaList.mangaListFeatureKey]: fromMangaList.State;
  [fromTrendignManga.trendingMangaFeatureKey]: fromTrendignManga.State;
  [fromBestEvaluatedAnime.bestEvaluatedMangaFeatureKey]: fromBestEvaluatedAnime.State;
  [fromMostAnticipatedAnime.mostAnticipatedMangaFeatureKey]: fromMostAnticipatedAnime.State;
  [fromMostPopular.mostPopularMangaFeatureKey]: fromMostPopular.State;
};

export const reducer = combineReducers({
  [fromMangaList.mangaListFeatureKey]: fromMangaList.reducer,
  [fromTrendignManga.trendingMangaFeatureKey]: fromTrendignManga.reducer,
  [fromBestEvaluatedAnime.bestEvaluatedMangaFeatureKey]: fromBestEvaluatedAnime.reducer,
  [fromMostAnticipatedAnime.mostAnticipatedMangaFeatureKey]: fromMostAnticipatedAnime.reducer,
  [fromMostPopular.mostPopularMangaFeatureKey]: fromMostPopular.reducer
});
