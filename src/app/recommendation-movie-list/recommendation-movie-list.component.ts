import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-recommendation-movie-list',
  templateUrl: './recommendation-movie-list.component.html',
  styleUrls: ['./recommendation-movie-list.component.scss']
})
export class RecommendationMovieListComponent implements OnInit {

  @Input() movieId;
  moviesList = [];


  constructor(
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.getRecommendationMovies();
  }

  getRecommendationMovies(): void {
    this.movieService.getRecommendationMovies(this.movieId).subscribe(
      movies => {
        console.log(movies.results);
        this.moviesList = movies.results;
      });
  }

}
