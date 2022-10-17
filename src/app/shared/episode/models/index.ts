export interface Episode {
  "id"?: string;
  "type"?: string;
  "attributes"?:any;
  "links"?:any;
  "relationships"?:any;
}


export interface LinksResponse {
  "data"?: Stream[];
  "links": any;
  "meta": any;
}

export interface Stream {
  "id": string;
  "type": string;
  "links": any;
  "attributes": Attributes;
  "relationships": any
}

export interface Attributes{
  "createdAt": string;
  "updatedAt": string;
  "url": string;
  "subs": string[];
  "dubs": string[];

}
