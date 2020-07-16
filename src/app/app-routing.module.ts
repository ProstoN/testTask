import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import {MoviesListComponent} from './movies-list/movies-list.component';


const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'detail/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
