
import { fromManga } from '@findAnime/shared/manga';
import { EntityStatus } from '@findAnime/shared/utils/functions';
import { createSelector } from '@ngrx/store';

export const selectMangaPageInit = createSelector(
  fromManga.selectTrendingStatus,
  fromManga.selectTrendingMangaList,
  fromManga.selectdMostAnticipatedStatus,
  fromManga.selectMostAnticipatedMangaList,
  fromManga.selectBestEvaluatedMStatus,
  fromManga.selectBestEvaluatedMangaList,
  fromManga.selectdMostPopularStatus,
  fromManga.selectMostPopularMangaList,
  (
    trendingStatus, trendingManga,
    mostAnticipatedStatus, mostAnticipatedManga,
    bestEvaluatedStatus, bestEvaluatedManga,
    mostPopularStatus, mostPopularManga,
  ) => {
    return {
      trendingManga: trendingManga ?? [],
      trendingStatus: trendingStatus ?? EntityStatus.Initial,
      mostAnticipatedManga: mostAnticipatedManga ?? [],
      mostAnticipatedStatus: mostAnticipatedStatus ?? EntityStatus.Initial,
      bestEvaluatedManga: bestEvaluatedManga ?? [],
      bestEvaluatedStatus: bestEvaluatedStatus ?? EntityStatus.Initial,
      mostPopularManga: mostPopularManga ?? [],
      mostPopularStatus: mostPopularStatus ?? EntityStatus.Initial,
    }
  }
);
