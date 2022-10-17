import { Filter } from "@findAnime/shared/manga";

export interface MangaListComponentState {
  page?: number;
  filter?: Filter;
  reload?: boolean;
}
