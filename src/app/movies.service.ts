import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/Movie';
// import { MOVIES } from './mock-movies';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private movieURL = 'api/movies';

  constructor(
    private messagesServices : MessagesService,
    private http : HttpClient) { }

  // Original version
  // getMovies() : Movie[] {
  //   return MOVIES;
  // }
  
  // version with the observable "of" instead of "map"
  getMovies() : Observable<Movie[]> {
    // this.messagesServices.add("Movies Service : fetched movie");
    // return of(MOVIES);
    return this.http.get<Movie[]>(this.movieURL)
            .pipe(
              tap(movies => this.log("All movies fetched")),
              catchError(this.handleError('getMovies', []))
            );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getMovie(id: String): Observable<Movie> {
  //   this.messagesServices.add(`MovieService: fetched movie id=${id}`);
  //   return of(MOVIES.find(movie => movie.id === id));
  // }

  private log(message : String){
        this.messagesServices.add("MovieService", message);
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: String): Observable<Movie> {
    const url = `${this.movieURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched Movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  addMovie(movie : Movie) : Observable<Movie> {
    return this.http.post<Movie>(this.movieURL, movie, httpOptions)
    .pipe(
      tap(_ => this.log(`added Movie `+ movie)),
      catchError(this.handleError<Movie>(`addMovie `+ movie))
    );
  }

  /** PUT: update the movie on the server */
  updateMovie (movie: Movie): Observable<any> {
    return this.http.put(this.movieURL, movie, httpOptions).pipe(
      tap(_ => this.log(`updated movie id=${movie.id}`)),
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  /** DELETE: delete the movie on the server */
  deleteMovie(movie : Movie | string) : Observable<Movie> {
    const id = typeof movie === 'string' ? movie : movie.id;
    const url = `${this.movieURL}/${id}`;
    return this.http.delete(url, httpOptions)
            .pipe(
              tap(_ => this.log(`deleted a movie id=${id}`)),
              catchError(this.handleError<any>('deleteMovie'))
            );
  }

  /* GET movies whose title contains search term */
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.movieURL}/?name=${term}`).pipe(
      tap(_ => this.log(`found movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }


}
