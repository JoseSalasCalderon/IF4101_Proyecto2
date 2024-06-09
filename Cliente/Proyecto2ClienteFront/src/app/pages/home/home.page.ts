import { Component, OnInit, DoCheck } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/services/cupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {

  cupones: Cupon[] = [];
  filteredCupones: Cupon[] = [];
  searchText: string = '';
  filterBy: string = 'none';

  constructor(private cuponService: CuponService, private router: Router) {}

  ngOnInit(): void {
    this.cuponService.obtenerCupones().subscribe((cupones) => {
      this.cupones = cupones;
      this.filteredCupones = cupones;
      this.filtrarCupones(); 
    });
  }

  filtrarCupones(): void {
    let tempCupones = this.cupones;

    // Filtro por categoría
    if (this.filterBy !== 'none') {
      tempCupones = tempCupones.filter(cupon => cupon.idCategoria.toString() === this.filterBy);
    }

    // Filtro por texto de búsqueda
    if (this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();
      tempCupones = tempCupones.filter(cupon => {
        return (
          (cupon.ubicacion ?? '').toLowerCase().includes(searchTextLower) ||
          cupon.nombreUsuario.toLowerCase().includes(searchTextLower) ||
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

  redirigirACupon() {
    this.router.navigate(['/carrito']);
  }
}
