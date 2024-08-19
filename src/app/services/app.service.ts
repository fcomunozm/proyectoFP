import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comic } from '../interface/comic';

export type Filter = [string, string];


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private menuState = new BehaviorSubject<boolean>(false);
  menuState$ = this.menuState.asObservable();

  private filter = new BehaviorSubject<Filter>(['', '']);
  filter$ = this.filter.asObservable();

  private cart = new BehaviorSubject<Comic[]>([]);
  cart$ = this.cart.asObservable();

  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  toggleMenu() {
    this.menuState.next(!this.menuState.value);
  }

  toggleCart() {
    this.cartOpen.next(!this.cartOpen.value);
  }

  addFilter(field: string, value: string) {
    const filter: Filter = [field, value];
    this.filter.next(filter);
  }


  // Métodos para el carrito
  addToCart(comic: Comic) {
    const currentCart = this.cart.value;
    const existingComic = currentCart.find(item => item.id === comic.id);

    if (existingComic) {
      // Actualizar la cantidad si el cómic ya está en el carrito
      existingComic.cantidad = comic.cantidad || 1;
      this.cart.next([...currentCart]);
      return;
    }

    // Si el cómic no está en el carrito, añadirlo
    this.cart.next([...currentCart, comic]);
  }

  updateCartItem(updatedItem: Comic) {
    const currentCart = this.cart.value;
    const index = currentCart.findIndex(item => item.id === updatedItem.id);

    if (index !== -1) {
      currentCart[index] = updatedItem;
      this.cart.next([...currentCart]);
    }
  }

  removeFromCart(comic: Comic) {
    const updatedCart = this.cart.value.filter(item => item.id !== comic.id);
    this.cart.next(updatedCart);
  }

  getCartItems() {
    return this.cart.asObservable();
  }

  clearFilter() {
    this.filter.next(['', '']); // Resetea el filtro a su estado inicial
  }
}
