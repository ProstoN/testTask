import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MovieDetail } from "../models/movie-detail";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../movie.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: MovieDetail;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  goBack() {
    this.location.back();
  }


  save(): void {
    this.movieService.updateMovie(this.movie)
      .subscribe(() => this.goBack());
  }
}
