import { Injectable } from '@angular/core';

import {Observable, of, Subject} from 'rxjs';

import { MovieDetail } from './models/movie-detail';
import { HttpClient} from '@angular/common/http';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private searchFilter = new Subject<any>();
  searchFilterEmitted$ = this.searchFilter.asObservable();

  private api = `1401ecb9f48be59a01b71998adffe7a2`;
  private popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.api}&language=en-US`;
  private searchMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.api}&language=en-US&query=`;
  private movieDetailByIdURL = `https://api.themoviedb.org/3/movie/`;
  private genresMovieURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.api}&language=en-US&page=1`;
  private recommendationsMoviesByMovieIdURL = `https://api.themoviedb.org/3/movie/`;
  imageBaseURL = 'https://image.tmdb.org/t/p/w154';

  constructor(private http: HttpClient) { }

  getMovies(pageId: number): Observable<any> {
    return this.http.get<Movie[]>(this.popularMoviesURL + '&page=' + pageId);
  }

  getRecommendationMovies(id: number): Observable<any> {
    const url = this.recommendationsMoviesByMovieIdURL + id + `/recommendations?api_key=${this.api}&language=en-US&page=1`;
    return this.http.get<any>(url);
  }

  emitChange(change: any): void {
    this.searchFilter.next(change);
  }

  search(query): Observable<any> {
    return this.http.get(this.searchMovieURL + this.convertToSlug(query));
  }

  convertToSlug(text: string): string {
    text = text.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '+')
      .replace(/-+/g, '+');
    return text;
  }
  getGenres(): Observable<any> {
    return this.http.get<any>(this.genresMovieURL);
  }

  getMovie(id: number): Observable<MovieDetail> {
    const url = this.movieDetailByIdURL + id + `?api_key=${this.api}&language=en-US`;
    return this.http.get<MovieDetail>(url);
  }
}
