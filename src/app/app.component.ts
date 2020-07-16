import {Component, OnInit} from '@angular/core';
import {MovieService} from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  filter = '';
  constructor(
    private movies: MovieService,
  ) {}
  ngOnInit(): void {

  }

  search(filter): void {
    console.log(filter);
    this.movies.emitChange(filter);
    this.filter = '';
  }
}
