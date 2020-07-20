import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MovieDetail } from '../../../models/movie-detail';
import {ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../../../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: MovieDetail;
  poster: string;
  listName = 'popular';
  moviesList = [];
  isSearch = false;
  isAdd: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {
    movieService.searchFilterEmitted$.subscribe(
      filter => {
        this.search(filter);
        this.listName = 'Search results of: ' + filter;
      });
  }

  ngOnInit(): void {
    this.getMovie();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.isAdd = this.checkMovieIntoFavorites(JSON.parse(localStorage.getItem('favorites')), +this.route.snapshot.paramMap.get('id'));
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => {
        this.movie = movie;
        if (movie.poster_path === null) {
          this.poster = 'http://via.placeholder.com/154x218?text=Not+avaliable';
        } else {
          this.poster = this.movieService.imageBaseURL + movie.poster_path;
        }
      });
  }

  search(query): void {
    this.movieService.search(query)
      .subscribe(
        (response) => {
          this.isSearch = true;
          this.moviesList = response.results;
        }
      );
  }

  addToFavorite(movieId: number): void {
    this.isAdd = !this.isAdd;
    let favoritesMovies
    favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
    const updateFavoritesMovie = this.updateFavoritesMovie(favoritesMovies, movieId);
    localStorage.setItem('favorites', JSON.stringify(updateFavoritesMovie));
  }

  removeFromFavorite(movieId: number): void {
    this.isAdd = !this.isAdd;
    const favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
    const updateFavoritesMovie = favoritesMovies.filter(id => movieId !== id);
    localStorage.setItem('favorites', JSON.stringify(updateFavoritesMovie));
  }

  private updateFavoritesMovie(arrayIds: number[], movieId: number): number[]{
    if (arrayIds.filter(id => movieId === id).length === 0){
      arrayIds.push(movieId);
    }
    return arrayIds;
  }

  private checkMovieIntoFavorites(arrayIds: number[], movieId: number): boolean {
    return arrayIds.filter(id => movieId === id).length !== 0;
  }
}
