import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.moviesService.getMovies()
      .subscribe(movies => this.movies = movies.slice(0, 4));
  }
}