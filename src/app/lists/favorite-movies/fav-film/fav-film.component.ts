import { Component, Input, OnInit, Output } from '@angular/core';
import { MovieService } from "../../../movie.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-fav-film',
  templateUrl: './fav-film.component.html',
  styleUrls: ['./fav-film.component.scss']
})
export class FavFilmComponent implements OnInit {

  @Input() movie;
  poster: string;
  display = false;
  genres = [];
  isAdd: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPoster();
    this.isAdd = this.checkMovieIntoFavorites(JSON.parse(localStorage.getItem("favorites")), this.movie.id)
  }

  public getPoster(): void {
    if (this.movie.poster_path === null) {
      this.poster = 'http://via.placeholder.com/154x218?text=Not+avaliable';
    } else {
      this.poster = this.movieService.imageBaseURL + this.movie.poster_path;
    }
  }

  removeFromFavorite(movieId: number) {
    this.isAdd = !this.isAdd;
    const favoritesMovies = JSON.parse(localStorage.getItem("favorites"));
    const updateFavoritesMovie = favoritesMovies.filter(id => movieId !== id);
    localStorage.setItem("favorites", JSON.stringify(updateFavoritesMovie));
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  private checkMovieIntoFavorites(arrayIds: number[], movieId: number): boolean {
    return arrayIds.filter(id => movieId === id).length !== 0;
  }

}
