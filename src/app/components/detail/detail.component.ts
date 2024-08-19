import { Component, OnInit } from '@angular/core';
import { Comic } from '../../interface/comic';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  comic: Comic | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private comicsService: ModelService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log(`ID recibido en DetailComponent: ${idParam}`);
    if (idParam !== null) {
      const comicId = +idParam;
      console.log(`ID convertido: ${comicId}`);
      this.comic = this.comicsService.getComic(comicId);
      console.log(`Comic encontrado: ${this.comic}`);
      if (this.comic === undefined) {
        this.errorMessage = `Comic con ID ${comicId} no encontrado.`;
      }
    } else {
      this.errorMessage = 'ID de cómic no proporcionado.';
    }
  }


  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}
