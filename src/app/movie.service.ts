import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MovieDetail } from './models/movie-detail';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movie } from "./models/movie";

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  // private moviesUrl = 'api/movies';  // URL to web api

  private queryMovie: string;
  private movieId: number;
  private movies: any;

  private api = "1401ecb9f48be59a01b71998adffe7a2";
  private popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.api}&language=en-US&page=1`;
  private searchMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.api}&language=en-US&query=${this.queryMovie}&page=1`;
  private movieDetailByIdURL = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.api}&language=en-US`;
  private genresMovieURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.api}&language=en-US&page=1`;
  private recommendationsMoviesByMovieIdURL = `https://api.themoviedb.org/3/movie/${this.movieId}/recommendations?api_key=${this.api}&language=en-US&page=1`;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    console.log(this.http.get<any>(this.popularMoviesURL).subscribe(
      movies => {
        this.movies = movies.results
      }
    ))
    return this.http.get<Movie[]>(this.popularMoviesURL);
  }

  getMovie(id: Number): Observable<MovieDetail> {
    const url = `${this.popularMoviesURL}/${id}`;
    return this.http.get<MovieDetail>(url);
  }

  searchMovies(term: string): Observable<MovieDetail[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<MovieDetail[]>(`${this.popularMoviesURL}/?name=${term}`);
  }

  addMovie(movie: MovieDetail): Observable<MovieDetail> {
    return this.http.post<MovieDetail>(this.popularMoviesURL, movie, this.httpOptions);
  }

  deleteMovie(movie: MovieDetail | number): Observable<MovieDetail> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.popularMoviesURL}/${id}`;

    return this.http.delete<MovieDetail>(url, this.httpOptions);
  }

  updateMovie(movie: MovieDetail): Observable<any> {
    return this.http.put(this.popularMoviesURL, movie, this.httpOptions);
  }
}
