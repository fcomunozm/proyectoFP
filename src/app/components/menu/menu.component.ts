import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'] // Corregir el nombre del archivo de estilos
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  isComicsMenuOpen = true;
  isDcMenuOpen = false;
  isMangaMenuOpen = false;
  isMarvelMenuOpen = false;

  constructor(private appService: AppService, private router: Router) { } // Inyectar Router

  ngOnInit(): void {
    this.appService.menuState$.subscribe(state => {
      this.isMenuOpen = state;
    });
  }

  goToHome() {
    this.isComicsMenuOpen = true;
    this.appService.clearFilter(); // Limpiar filtros
    this.router.navigate(['/home']);
  }

  goToContacto() {
    this.closeAllMenus(); // Cerrar todos los menús
    this.router.navigate(['/contacto']);
  }

  goToSobreNosotros() {
    this.closeAllMenus(); // Cerrar todos los menús
    this.router.navigate(['/sobre-nosotros']);
  }

  toggleComicsMenu() {
    this.isComicsMenuOpen = !this.isComicsMenuOpen;
  }

  toggleDcMenu() {
    this.isDcMenuOpen = !this.isDcMenuOpen;
  }

  toggleMangaMenu() {
    this.isMangaMenuOpen = !this.isMangaMenuOpen;
  }

  toggleMarvelMenu() {
    this.isMarvelMenuOpen = !this.isMarvelMenuOpen;
  }

  addFilter(field: string, value: string) {
    this.appService.addFilter(field, value);
    this.updateUrl(field, value);
  }

  private closeAllMenus() {
    this.isComicsMenuOpen = false;
    this.isDcMenuOpen = false;
    this.isMangaMenuOpen = false;
    this.isMarvelMenuOpen = false;
  }

  private updateUrl(field: string, value: string): void {
    const newParams: { [key: string]: string } = {};
    if (value) {
      newParams[field] = value;
    }
    this.router.navigate([], {
      queryParams: newParams,
      queryParamsHandling: ''
    });
  }
}
