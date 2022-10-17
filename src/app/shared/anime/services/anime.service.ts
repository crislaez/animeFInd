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
export class AnimeService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  perPage: number = this._coreConfig.getPerPage();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAnimeList(page: number, filter: Filter): Observable<{animeList: AnimeManga[], totalCount: number}>{
    const { text = null, categories = null } = filter || {};

    let params = ''
    if(!!text) params +=`&filter[text]=${text}`;
    if(!!categories) params +=`&filter[categories]=${categories}`;

    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/anime?page[limit]=${this.perPage}&page[offset]=${page}${params}`).pipe( //, { params }
      map(response => {
        const { data = null, meta = null } = response || {};
        const { count = null } = meta || {};
        return { animeList: data || [], totalCount: count || 0 };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getTrendingAnime(): Observable<{animeList: AnimeManga[]}>{
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/trending/anime`).pipe( //?limit=5
      map(response => {
        const { data = null } = response || {};
        return { animeList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMostAnticipatedAnime(): Observable<{animeList: AnimeManga[]}>{ //MAS ESPERADOS
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/anime?filter%5Bstatus%5D=upcoming&page%5Blimit%5D=10&sort=-user_count`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { animeList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getBestEvaluatedAnime(): Observable<{animeList: AnimeManga[]}>{ //MEJOR EVALUADOS
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/anime?page%5Blimit%5D=10&sort=-average_rating`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { animeList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMostPopularAnime(): Observable<{animeList: AnimeManga[]}>{ //MAS POPULARES
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/anime?page%5Blimit%5D=10&sort=-user_count`).pipe(
      map(response => {
        const { data = null } = response || {};
        return { animeList: data || [] };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}

