import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  moviesList = [];
  listName = 'popular';
  currentPage = 1;


  constructor(
    private movieService: MovieService,
  ) {
    movieService.searchFilterEmited$.subscribe(
      filter => {
        this.search(filter);
        this.listName = 'Search results of: ' + filter;
      });
  }

  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }

  getMovies(page: number): void {
    this.movieService.getMovies(page).subscribe(
      movies => {
        this.moviesList = movies.results;
      });
  }

  loadMovie(nextPage: boolean): void {
    if (nextPage){
      this.getMovies(this.currentPage + 1);
      this.currentPage += 1;
    } else {
      this.getMovies(this.currentPage - 1);
      this.currentPage -= 1;
    }
  }

  search(query): void {
    this.movieService.search(query)
      .subscribe(
        (response) => {
          this.moviesList = response.results;
        }
      );
  }
}
