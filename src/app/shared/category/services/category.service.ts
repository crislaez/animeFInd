import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@findAnime/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category, CategoryResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getCategories(): Observable<{categories: Category[]}>{
    return this.http.get<CategoryResponse>(`${this.baseURL}edge/categories?page%5Blimit%5D=40&sort=-total_media_count`).pipe( //, { params }
      map(response => {
        const { data = null } = response || {};
        return {
          categories: (data || [])?.map(({attributes}) => {
            const {slug:value = null , title:label = null} = attributes || {};
            return {value, label};
          })
        };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
