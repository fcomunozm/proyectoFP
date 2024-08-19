import { Injectable } from '@angular/core';
import { Comic } from '../interface/comic';
import { comics } from '../model/comics-model'; // Importar cómics

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private comics: Comic[] = comics; // Inicializar con los cómics importados

  constructor() { }

  getComics(): Comic[] {
    return this.comics;
  }

  getComic(id: number): Comic | undefined {
    console.log(`Buscando cómic con ID: ${id}`);
    return this.comics.find(comic => comic.id === id);
  }
}
