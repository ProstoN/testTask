import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MovieDetail } from '../models/movie-detail';
import {ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../movie.service';

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

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {
    movieService.searchFilterEmited$.subscribe(
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
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => {
        this.movie = movie;
        console.log(movie)
        if (movie.poster_path === null) {
          this.poster = 'http://via.placeholder.com/154x218?text=Not+avaliable';
        } else {
          this.poster = this.movieService.imageBaseURL + movie.poster_path;
        }
      });
  }

  goBack(): void {
    this.location.back();
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

  save(): void {
    this.movieService.updateMovie(this.movie)
      .subscribe(() => this.goBack());
  }
}
