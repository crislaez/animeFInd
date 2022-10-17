import { Filter } from "@findAnime/shared/anime";

export interface AnimeListComponentState {
  page?: number;
  filter?: Filter;
  reload?: boolean;
}
