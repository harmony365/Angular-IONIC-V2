import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute , RouterLink} from '@angular/router';
import { IonHeader, IonToolbar, IonMenuButton, IonTitle, IonContent , IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, RouterLink],
})
export class HomePage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute); 
  constructor() { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
