export interface AnimeMangaRespone {
  "data"?: AnimeManga[];
  "links": Link;
  "meta":Meta;
}

export interface AnimeManga {
  "id": string;
  "type": string;
  "links": CommosItem
  "attributes": Attributes;
  "relationships": RelationShips;
}

export interface Meta {
  "count": number;
}

export interface Link {
  "first": string;
  "next": string;
  "last": string;
}

export interface CommonsLink {
  "links": CommosItem;
}

export interface CommosItem {
  "self"?: string;
  "related"?: string;
}

export interface Attributes {
  "createdAt": string;
  "updatedAt": string
  "slug": string;
  "synopsis": string;
  "coverImageTopOffset": number;
  "titles": Title,
  "canonicalTitle" :string;
  "abbreviatedTitles": string[];
  "averageRating": string;
  "ratingFrequencies": {[key:string]:string},
  "userCount": number;
  "favoritesCount": number;
  "startDate": string;
  "endDate": string;
  "nextRelease": null,
  "airdate":string,
  "popularityRank": number;
  "ratingRank":number;
  "ageRating": "PG",
  "thumbnail":any;
  "ageRatingGuide": string;
  "subtype": string;
  "mangaType":string;
  "status": string;
  "tba": string;
  "length"?:number;
  "volumeNumber"?: number;
  "posterImage": Images;
  "coverImage": Images,
  "episodeCount": number;
  "episodeLength": number;
  "totalLength": number;
  "youtubeVideoId": string;
  "showType": string;
  "seasonNumber"?: number;
  "number"?:number,
  "nsfw": boolean;
}

export interface RelationShips {
  "genres": string;
  "categories": CommonsLink;
  "castings":  CommonsLink;
  "installments":  CommonsLink;
  "mappings":  CommonsLink;
  "reviews":  CommonsLink;
  "mediaRelationships":  CommonsLink;
  "characters":  CommonsLink;
  "staff":  CommonsLink;
  "productions":  CommonsLink;
  "quotes":  CommonsLink;
  "episodes":  CommonsLink;
  "streamingLinks":  CommonsLink;
  "animeProductions":  CommonsLink;
  "animeCharacters":  CommonsLink;
  "animeStaff":  CommonsLink;
}

export interface Title {
  "en": string;
  "en_jp": string;
  "ja_jp": string;
}

export interface Images {
  "tiny"?: string;
  "large"?: string;
  "small"?: string;
  "medium"?: string;
  "original"?: string;
  "meta"?: any;
}
