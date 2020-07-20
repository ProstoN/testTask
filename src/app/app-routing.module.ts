import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './lists/movies-list/movie-detail/movie-detail.component';
import {MoviesListComponent} from './lists/movies-list/movies-list.component';
import { FavoriteMoviesComponent } from "./lists/favorite-movies/favorite-movies.component";


const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'favorites', component: FavoriteMoviesComponent },
  { path: 'detail/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
