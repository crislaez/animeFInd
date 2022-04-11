import { IonContent } from "@ionic/angular";
import { SwiperOptions } from "swiper";
import { AnimeManga } from "../models";

export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const emptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export const smallSliceText = (text: string) => {
  return text?.length > 10 ? text?.slice(0, 10) + '...' : text;
}

export const sliceText = (text: string) => {
  return text?.length > 17 ? text?.slice(0, 17) + '...' : text;
}

export const sliceLongText = (text: string) => {
  return text?.length > 30 ? text?.slice(0, 30) + '...' : text;
}

export const getSliderConfig = (info:any): SwiperOptions => {
  return {
    slidesPerView: info?.length > 1 ? 2 : 1,
    spaceBetween: 40,
    // freeMode: true,
    pagination:{ clickable: true },
    lazy: true,
    preloadImages: false
  };
}

export const getImage = (item: AnimeManga, option?:boolean): string => {
  const { attributes = null } = item || {};
  const { posterImage = null } = attributes || {};
  return !option
    ? posterImage?.tiny || posterImage?.small || posterImage?.medium || posterImage?.large || posterImage?.original
    : posterImage?.original || posterImage?.large || posterImage?.medium || posterImage?.small || posterImage?.tiny;
}

export const getTitle = (titles: any): string => {
  return titles['en'] || titles['en_jp'] || titles['en_us'] || titles['en_cn'] || '';
}

export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};
