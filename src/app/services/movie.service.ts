import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';

const BASE_URL = 'https://api.themoviedb.org/3';
const APIKEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  constructor() { }

  getTopRateMovies(page = 1): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${APIKEY}`)
    .pipe(
      // delay(2000)
    );
  }

  getMovieDetails(id: string): Observable<MovieResult>{
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${APIKEY}`);
  }

}
