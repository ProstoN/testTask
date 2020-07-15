import { Component, OnInit } from '@angular/core';
import { MovieDetail } from "../models/movie-detail";
import { MovieService } from "../movie.service";
import { Movie } from "../models/movie";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies.slice(1, 5));
  }

}
