import { Component, OnDestroy, OnInit } from '@angular/core';
import { comics } from '../../../model/comics-model';
import { Comic } from '../../../interface/comic';
import { elementAt, Subscription } from 'rxjs';
import { AppService, Filter } from '../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'comics-batman',
  templateUrl: './batman.component.html',
  styleUrls: ['./batman.component.css']
})
export class BatmanComponent implements OnInit, OnDestroy {
  comics = comics;
  titulo: string = 'Comics';

  filteredComics: Comic[] = [];
  private filterSubscription: Subscription | null = null;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get displayedComics() {
    return this.filteredComics;
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  ngOnInit() {
    // Fisher-Yates shuffle
    for (let i = this.comics.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.comics[i], this.comics[j]] = [this.comics[j], this.comics[i]];
    }

    this.filterSubscription = this.appService.filter$.subscribe(filter => {
      console.log('Filtro recibido:', filter);
      this.applyFilter(filter);
    });

  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  applyFilter(filter: Filter) {
    console.log('Aplicando filtro:', filter);

    this.filteredComics = [...this.comics];

    const [field, value] = filter;
    if (field === 'serie') {
      this.filteredComics = this.filteredComics.filter(comic => comic.serie === value);
    }
    else if (field === 'colecciones') {
      this.filteredComics = this.filteredComics.filter(comic => comic.colecciones.includes(value));
    }

    if (value === 'OTROS-MARVEL') {
      this.titulo = 'TODO MARVEL';
    } else if (value === 'Superman-batman') {
      this.titulo = 'SUPERMAN Y BATMAN';
    } else if (value === '') {
      this.titulo = 'Cómics';
    } else {
      this.titulo = value.toUpperCase();
    }

    console.log('Título actualizado a:', this.titulo);

    this.router.navigate([], {
      queryParams: filter.reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {}),
      queryParamsHandling: 'merge'
    });
  }

  buscarComics(term: string) {
    this.filteredComics = this.comics.filter(comic =>
      comic.titulo.toLowerCase().includes(term.toLowerCase())
    );
  }

  addToCart(comic: Comic) {
    // Llamar al método de servicio para agregar el cómic al carrito
    this.appService.addToCart({
      ...comic,
      cantidad: 1 // Establecer la cantidad inicial en 1
    });
  }
}
