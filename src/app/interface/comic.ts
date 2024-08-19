export interface Comic {
  id: number;
  colecciones: string[];
  titulo: string;
  serie: string;
  precioRegular: number;
  precioEspecial: number;
  autores: string[];
  editorial: string;
  etiquetas: string[];
  descripcion: string;
  isbn: string;
  numeroDePaginas: number;
  img: string;
  cantidad?: number;
}
