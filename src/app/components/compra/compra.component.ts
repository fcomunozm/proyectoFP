import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Comic } from '../../interface/comic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit, OnDestroy {
  cartItems: Comic[] = [];
  private cartSubscription: Subscription | null = null;
  isCartOpen: boolean = false;

  constructor(private appService: AppService) {
    this.appService.cartOpen$.subscribe((isOpen: boolean) => this.isCartOpen = isOpen);
  }


  ngOnInit() {
    this.cartSubscription = this.appService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateCantidad(item: Comic) {
    // Actualizar la cantidad en el carrito
    this.appService.updateCartItem(item);
  }

  removeFromCart(item: Comic) {
    // Eliminar el producto del carrito
    this.appService.removeFromCart(item);
  }

  getTotal(): number {
    // Calcular el total del carrito
    return this.cartItems.reduce((total, item) => total + (item.precioEspecial * (item.cantidad || 1)), 0);
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  onContainerClick(event: MouseEvent) {
    // Evitar que el clic en el contenido del carrito cierre el carrito
    event.stopPropagation();
  }

  toggleCart() {
    this.appService.toggleCart();
  }


}
