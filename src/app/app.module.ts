import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './lists/movies-list/movies/movies.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './lists/movies-list/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from './lists/movies-list/movies-list.component';
import { RecommendationMovieListComponent } from './lists/recommendation-movie-list/recommendation-movie-list.component';
import { RecommendationMovieComponent } from './lists/recommendation-movie-list/recommendation-movie/recommendation-movie.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FavoriteMoviesComponent } from "./lists/favorite-movies/favorite-movies.component";
import { FavFilmComponent } from './lists/favorite-movies/fav-film/fav-film.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MoviesListComponent,
    RecommendationMovieListComponent,
    RecommendationMovieComponent,
    FavoriteMoviesComponent,
    FavFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwPaginationModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
