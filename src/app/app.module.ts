import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { RecommendationMovieListComponent } from './recommendation-movie-list/recommendation-movie-list.component';
import { RecommendationMovieComponent } from './recommendation-movie/recommendation-movie.component';
import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MoviesListComponent,
    RecommendationMovieListComponent,
    RecommendationMovieComponent,
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
