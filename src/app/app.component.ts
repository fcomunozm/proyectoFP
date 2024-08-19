import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'bigbangcomics';
  isMenuOpen: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.menuState$.subscribe(state => {
      this.isMenuOpen = state;
    });
  }
}
