import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../movie.service';
import { ViewportScroller } from "@angular/common";

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
    private vps: ViewportScroller
  ) {
    movieService.searchFilterEmitted$.subscribe(
      filter => {
        this.search(filter);
        this.listName = 'Search results of: ' + filter;
      });
  }


  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }

  scroll(id): void {
    this.vps.scrollToAnchor(id);
  }

  getMovies(page: number): void {
    this.movieService.getMovies(page).subscribe(
      movies => {
        this.moviesList = movies.results;
      });
  }

  loadMovie(nextPage: boolean, target?: string): void {
    if (nextPage){
      this.getMovies(this.currentPage + 1);
      this.currentPage += 1;
    } else {
      this.getMovies(this.currentPage - 1);
      this.currentPage -= 1;
    }
    if (target !== undefined){
      this.scroll(target);
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
