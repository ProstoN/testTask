import {Component, Input, OnInit} from '@angular/core';
import { MovieService } from '../movie.service';

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


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getPoster();
    this.getGenres();
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
}
