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
export class EpisodeService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;
  perPage: number = this._coreConfig.getPerPage();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getEpisodes(idAnime:string, page: number, filter: Filter): Observable<{episodes: AnimeManga[], totalCount: number}>{
    return this.http.get<AnimeMangaRespone>(`${this.baseURL}edge/anime/${idAnime}/episodes?page[limit]=${this.perPage}&page[offset]=${page}`).pipe( //, { params }
      map(response => {
        const { data = null, meta = null } = response || {};
        const { count = null } = meta || {};
        return { episodes: data || [], totalCount: count || 0 };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
