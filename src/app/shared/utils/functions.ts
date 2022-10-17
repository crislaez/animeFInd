import { IonContent } from "@ionic/angular";
import { SwiperOptions } from "swiper";
import { AnimeManga } from "../models";


export const trackById = (_: number, item: any): number => {
  return item?.id ?? item;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const isNotEmptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export const sliceText = (text: string, length: number = 30) => {
  return text?.length > 17 ? text?.slice(0, length) + '...' : text;
}

export const appColors = {
  0:'#8F98FF',
  1:'#FB774D',
  2:'#4DC590',
  3:'#3C396E',
  4:'#E74C3C',
  5:'#B7B7B7',
  6:'#6C3483',
  7:'#C383E1',
  8:'#2874A6',
  9:'#1ABC9C',
}

export const getSliderConfig = (): SwiperOptions => {
  return {
    slidesPerView: 3,
    // spaceBetween: 10,
    freeMode: true,
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
