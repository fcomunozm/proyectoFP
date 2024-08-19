import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isMenuOpen: boolean = false;
  private menuSubscription: Subscription | null = null;
  isCartOpen: boolean = false; // Añadido para manejar la visibilidad del carrito

  constructor(private appService: AppService) {
    this.appService.cartOpen$.subscribe((isOpen: boolean) => this.isCartOpen = isOpen);
  }

  ngOnInit() {
    this.menuSubscription = this.appService.menuState$.subscribe(
      isOpen => this.isMenuOpen = isOpen
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const nombreElement = document.querySelector('.nombre');
      if (nombreElement) {
        nombreElement.classList.add('animate-once', 'batman-robin-animate');
      }
    }, 0);
  }

  toggleMenu() {
    this.appService.toggleMenu();
  }

  toggleCart() {
    this.appService.toggleCart();
  }

  ngOnDestroy() {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
}
