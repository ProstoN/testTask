import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MovieService } from '../../movie.service';
import { MovieDetail } from '../../models/movie-detail';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  moviesList = [];
  movie: MovieDetail;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const favoritesMovies = JSON.parse(localStorage.getItem('favorites'));
    for (const id of favoritesMovies) {
      this.getMovie(id);
    }
  }

  getMovie(id: number): void {
    this.movieService.getMovie(id)
      .subscribe(movie => {
        this.moviesList.push(movie);
      });
  }
}
