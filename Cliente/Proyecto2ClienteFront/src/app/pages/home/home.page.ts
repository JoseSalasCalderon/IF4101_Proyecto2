import { Component, OnInit, DoCheck } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/services/cupon.service';

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

  constructor(private cuponService: CuponService) {}

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
}
