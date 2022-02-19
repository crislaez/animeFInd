import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { AnimeManga, AnimeMangaRespone } from '@findAnime/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Filter } from '../models';


@Injectable({
  providedIn: 'root'
})
export class MangaService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  perPage: number = this._coreConfig.getPerPage();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getMangaList(page: number, filter: Filter): Observable<{mangaList: AnimeManga[], totalCount: number}>{
    const { text = null } = filter || {};

    let params = ''
    if(!!text) params +=`&filter[text]=${text}`

    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/manga?page[limit]=${this.perPage}&page[offset]=${page}${params}`).pipe(
      map(response => {
        const { data = null, meta = null } = response || {};
        const { count = null } = meta || {};
        return { mangaList: data || [], totalCount: count || 0 };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getTrendingManga(): Observable<{trendingMangaList: AnimeManga[]}>{
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/trending/manga`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { trendingMangaList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
