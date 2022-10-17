import { fromAnime } from '@findAnime/shared/anime';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createSelector } from '@ngrx/store';

export const selectAnimePageInit = createSelector(
  fromAnime.selectTrendingStatus,
  fromAnime.selectTrendingAnimeList,
  fromAnime.selectMostAnticipatedStatus,
  fromAnime.selectMostAnticipatedAnimeList,
  fromAnime.selectBestEvaluatedStatus,
  fromAnime.selectBestEvaluatedAnimeList,
  fromAnime.selectMostPopularStatus,
  fromAnime.selectMostPopularAnimeList,
  (
    trendingStatus, trendingAnime,
    mostAnticipatedStatus, mostAnticipatedAnime,
    bestEvaluatedStatus, bestEvaluatedAnime,
    mostPopularStatus, mostPopularAnime,
  ) => {
    return {
      trendingAnime: trendingAnime ?? [],
      trendingStatus: trendingStatus ?? EntityStatus.Initial,
      mostAnticipatedAnime: mostAnticipatedAnime ?? [],
      mostAnticipatedStatus: mostAnticipatedStatus ?? EntityStatus.Initial,
      bestEvaluatedAnime: bestEvaluatedAnime ?? [],
      bestEvaluatedStatus: bestEvaluatedStatus ?? EntityStatus.Initial,
      mostPopularAnime: mostPopularAnime ?? [],
      mostPopularStatus: mostPopularStatus ?? EntityStatus.Initial,
    }
  }
);
