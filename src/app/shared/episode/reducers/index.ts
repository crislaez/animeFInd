import { combineReducers } from "@ngrx/store";
import * as fromEpisode from "./episode.reducer";
import * as fromStream from "./stream.reducers";

export const combineFeatureKey = 'anime-info';

export interface CombineState {
  [fromEpisode.episodeFeatureKey]: fromEpisode.State;
  [fromStream.streamFeatureKey]: fromStream.State;
};

export const reducer = combineReducers({
  [fromEpisode.episodeFeatureKey]: fromEpisode.reducer,
  [fromStream.streamFeatureKey]: fromStream.reducer,
});
