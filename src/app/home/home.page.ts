import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute , RouterLink, RouterModule} from '@angular/router';
import { 
  IonHeader, IonList, IonToolbar, 
  IonMenuButton, IonTitle, IonContent , 
  IonButtons, InfiniteScrollCustomEvent ,
  IonSkeletonText, IonItem, IonAvatar,
  IonAlert, IonLabel, IonBadge,
 } from '@ionic/angular/standalone';

import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    DatePipe, RouterModule,
    IonSkeletonText, IonHeader, 
    IonList, IonToolbar, IonButtons, 
    IonMenuButton, IonTitle, IonContent, 
    RouterLink, IonSkeletonText, IonItem, 
    IonAvatar, IonAlert, IonLabel, 
    IonBadge,
  ],
})
export class HomePage implements OnInit {
  private activatedRoute = inject(ActivatedRoute); 
  private movieService = inject( MovieService);
  public folder!: string;
  public currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[]=[];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);



  constructor() { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.loadMovies();
  
  }


  loadMoviesOld(){
    this.movieService.getMovieDetails("787699").subscribe((movies) => {
      console.log(movies);
    })
  }

  loadMovies(event?: InfiniteScrollCustomEvent){
    this.error = null;

    if(!event){
      this.isLoading= true;
    }

    this.movieService.getTopRateMovies(this.currentPage).pipe(
      finalize(()=>{
        this.isLoading = false;
        if (event){
          event.target.complete();
        }
      }),
      catchError((err:any)=>{
        console.log(err);
        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) =>{
        this.movies.push(...res.results);
        console.log(this.movies);
  
        if (event){
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    })
  }

  loadMore(event: InfiniteScrollCustomEvent){

  }

}
