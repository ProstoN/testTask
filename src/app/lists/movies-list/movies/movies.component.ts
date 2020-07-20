import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() movie;
  @Input() genreListIds;
  poster: string;
  display = false;
  genres = [];
  isAdd: boolean;



  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getPoster();
    this.getGenres();
    this.isAdd = this.checkMovieIntoFavorites(JSON.parse(localStorage.getItem('favorites')), this.movie.id);
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe(
      genresList => {
        for (const genreId of this.genreListIds){
          for (const genre of genresList.genres){
            if (genreId === genre.id){
              this.genres.push(genre.name);
            }
          }
        }
      }
    );
  }

  public getPoster(): void {
    if (this.movie.poster_path === null) {
      this.poster = 'http://via.placeholder.com/154x218?text=Not+avaliable';
    } else {
      this.poster = this.movieService.imageBaseURL + this.movie.poster_path;
    }
  }

  addToFavorite(movieId: number): void {
    this.isAdd = !this.isAdd;
    let favoritesMovies
    favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
    const updateFavoritesMovie = this.updateFavoriteMovies(favoritesMovies, movieId);
    localStorage.setItem('favorites', JSON.stringify(updateFavoritesMovie));
  }

  removeFromFavorite(movieId: number): void {
    this.isAdd = !this.isAdd;
    const favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
    const updateFavoritesMovie = favoritesMovies.filter(id => movieId !== id);
    localStorage.setItem('favorites', JSON.stringify(updateFavoritesMovie));
  }

  private updateFavoriteMovies(arrayIds: number[], movieId: number): number[]{
    if (arrayIds.filter(id => movieId === id).length === 0){
      arrayIds.push(movieId);
    }
    return arrayIds;
  }

  private checkMovieIntoFavorites(arrayIds: number[], movieId: number): boolean {
    return arrayIds.filter(id => movieId === id).length !== 0;
  }
}
