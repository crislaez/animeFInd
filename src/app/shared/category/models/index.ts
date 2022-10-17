export interface Category {
  label?:string;
  value?: string;
}

export interface CategoryResponseItem {
  attributes: Attribute;
  id: string;
  links: Link;
  relationships: Relationship;
  type: string;
}

export interface CategoryResponse {
  data: CategoryResponseItem[];
  links: Link
  meta: Meta
}

export interface Link {
  first?: string;
  last?: string;
  next?: string;
  self?: string
}

export interface Meta {
  count: number;
}

export interface Attribute {
  childCount: number;
  createdAt: string;
  description: string;
  nsfw: boolean;
  slug: string;
  title: string;
  totalMediaCount: number;
  updatedAt: string;
}

export interface Relationship {
  anime: any;
  drama: any;
  manga: any;
  parent: any;
}
