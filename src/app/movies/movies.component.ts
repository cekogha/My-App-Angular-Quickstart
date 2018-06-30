import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie';
// import { MOVIES } from '../mock-movies';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies : Movie[];

  selectedMovie: Movie;
  constructor(private moviesService : MoviesService) {
  
  }

  // Original version
  // getMovies() : void {
  //   this.movies = this.moviesService.getMovies();
  // }

  // version with the observable
  getMovies() : void {
    this.moviesService.getMovies()
        .subscribe(allMovies => this.movies = allMovies);
  }

  ngOnInit() {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

  add(title: String): void {
    title = title.trim();
    
    if (!title) { return; }

    this.moviesService.addMovie({ title } as Movie)
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.moviesService.deleteMovie(movie).subscribe();
  }


}
