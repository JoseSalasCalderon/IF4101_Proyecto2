import { Component, OnInit, DoCheck } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/services/cupon.service';
import { Categoria, CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {

  cupones: Cupon[] = [];
  categorias: Categoria[] = [];
  filteredCupones: Cupon[] = [];
  searchText: string = '';
  filterBy: string = 'none';

  constructor(
    private cuponService: CuponService, 
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cuponService.obtenerCupones().subscribe((cupones) => {
    this.cupones = cupones;
    this.filteredCupones = cupones;
    this.filtrarCupones(); 
  });

    // Cargar categorías
    this.categoriaService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  precioFinalPorCupon(cupon: Cupon){
    if (cupon.descuento) {
      const precioFinal = (cupon.precio-(cupon.precio*(cupon.descuento/100)));
      return precioFinal.toFixed(2);
    }else {
      return cupon.precio;
    }
  }


  filtrarCupones(): void {
    let tempCupones = this.cupones;

    // Filtro por categoría
    if (this.filterBy !== 'none') {
      tempCupones = tempCupones.filter(categoria => categoria.nombreCategoria === this.filterBy);
    }

    // Filtro por texto de búsqueda
    if (this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();
      tempCupones = tempCupones.filter(cupon => {
        return (
          (cupon.ubicacion ?? '').toLowerCase().includes(searchTextLower) ||
          cupon.nombreEmpresa.toLowerCase().includes(searchTextLower) ||
          cupon.precio.toString().includes(searchTextLower)
        );
      });
    }

    this.filteredCupones = tempCupones;
  }

  ngDoCheck(): void {
    this.filtrarCupones();
  }

  agregarAlCarrito(cupon: Cupon): void {
    let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');

    const existingCupon = carrito.find((item: any) => item.idCupon === cupon.idCupon);
    if (existingCupon) {
      existingCupon.cantidad += 1;
    } else {
      carrito.push({ ...cupon, cantidad: 1 });
    }

    sessionStorage.setItem('carrito', JSON.stringify(carrito));
  }
}
