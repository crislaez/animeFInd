import { combineReducers } from "@ngrx/store";
import * as fromAnimeList from "./anime.reducer";
import * as fromBestEvaluatedAnime from './best-evaluated.reducer';
import * as fromMostAnticipatedAnime from './most-anticipated.reducer';
import * as fromMostPopular from './most-popular.reducer';
import * as fromTrendignAnime from "./tranding.reducer";

export const combineFeatureKey = 'anime';

export interface CombineState {
  [fromAnimeList.animeListFeatureKey]: fromAnimeList.State;
  [fromTrendignAnime.trendingAnimeFeatureKey]: fromTrendignAnime.State;
  [fromMostAnticipatedAnime.mostAnticipatedAnimeFeatureKey]: fromMostAnticipatedAnime.State;
  [fromBestEvaluatedAnime.bestEvaluatedAnimeFeatureKey]: fromBestEvaluatedAnime.State;
  [fromMostPopular.mostPopularAnimeFeatureKey]: fromMostPopular.State;
};

export const reducer = combineReducers({
  [fromAnimeList.animeListFeatureKey]: fromAnimeList.reducer,
  [fromTrendignAnime.trendingAnimeFeatureKey]: fromTrendignAnime.reducer,
  [fromMostAnticipatedAnime.mostAnticipatedAnimeFeatureKey]: fromMostAnticipatedAnime.reducer,
  [fromBestEvaluatedAnime.bestEvaluatedAnimeFeatureKey]: fromBestEvaluatedAnime.reducer,
  [fromMostPopular.mostPopularAnimeFeatureKey]: fromMostPopular.reducer
});
