import {Component, Input, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-recommendation-movie',
  templateUrl: './recommendation-movie.component.html',
  styleUrls: ['./recommendation-movie.component.scss']
})
export class RecommendationMovieComponent implements OnInit {

  @Input() movie;
  @Input() genreListIds;
  poster: string;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
   this.getPoster();
  }

  public getPoster(): void {
    if (this.movie.poster_path === null) {
      this.poster = 'http://via.placeholder.com/154x218?text=Not+avaliable';
    } else {
      this.poster = this.movieService.imageBaseURL + this.movie.poster_path;
    }
  }
}
