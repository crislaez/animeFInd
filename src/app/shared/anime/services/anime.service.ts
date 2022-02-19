import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { AnimeManga, AnimeMangaRespone } from '@findAnime/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Filter } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  perPage: number = this._coreConfig.getPerPage();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAnimeList(page: number, filter: Filter): Observable<{animeList: AnimeManga[], totalCount: number}>{
    const { text = null } = filter || {};

    let params = ''
    if(!!text) params +=`&filter[text]=${text}`

    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/anime?page[limit]=${this.perPage}&page[offset]=${page}${params}`).pipe( //, { params }
      map(response => {
        const { data = null, meta = null } = response || {};
        const { count = null } = meta || {};
        return { animeList: data || [], totalCount: count || 0 };
      }),
      // map(() => {
      //   throw 505
      // }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getTrendingAnime(): Observable<{trendingAnimeList: AnimeManga[]}>{
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/trending/anime`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { trendingAnimeList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

