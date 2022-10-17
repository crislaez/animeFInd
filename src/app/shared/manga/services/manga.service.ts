import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { AnimeManga, AnimeMangaRespone } from '@findAnime/shared/models';
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
    const { text = null, categories = null } = filter || {};

    let params = ''
    if(!!text) params +=`&filter[text]=${text}`;
    if(!!categories) params +=`&filter[categories]=${categories}`;

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

  getTrendingManga(): Observable<{mangaList: AnimeManga[]}>{
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/trending/manga`).pipe( //?limit=5
      map(response => {
        const { data = null } = response || {};
        return { mangaList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


  getMostAnticipatedManga(): Observable<{mangaList: AnimeManga[]}>{ //MAS ESPERADOS
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/manga?filter%5Bstatus%5D=upcoming&page%5Blimit%5D=10&sort=-user_count`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { mangaList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getBestEvaluatedManga(): Observable<{mangaList: AnimeManga[]}>{ //MEJOR EVALUADOS
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/manga?page%5Blimit%5D=10&sort=-average_rating`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { mangaList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMostPopularManga(): Observable<{mangaList: AnimeManga[]}>{ //MAS POPULARES
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/manga?page%5Blimit%5D=10&sort=-user_count`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { mangaList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

}
