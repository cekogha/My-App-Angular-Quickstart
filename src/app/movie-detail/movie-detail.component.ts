import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/Movie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MoviesService }  from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})


export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.moviesService.getMovie(id.toString())
      .subscribe(movie => this.movie = movie);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.moviesService.updateMovie(this.movie)
      .subscribe(() => this.goBack());
  }

}
