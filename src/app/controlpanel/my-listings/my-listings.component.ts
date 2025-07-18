import { Component } from '@angular/core';


interface Car {
  id: number;
  brand: string;
  title: string;
  model: string;
  imageUrl: string;
  publishDate: Date;
  price: number;
  views: number;
  active: boolean;
}

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent {
   cars: Car[] = [
    {
      id: 1,
      brand: 'Toyota',
      title: 'Corolla',
      model: '2020',
      imageUrl: 'https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp',
      publishDate: new Date(2023, 3, 12),
      price: 15000,
      views: 120,
      active: true,
    },
    {
      id: 2,
      brand: 'Honda',
      title: 'Civic',
      model: '2019',
      imageUrl: 'https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp',
      publishDate: new Date(2023, 1, 22),
      price: 13000,
      views: 90,
      active: false,
    },
    {
      id: 3,
      brand: 'Ford',
      title: 'Mustang',
      model: '2021',
      imageUrl: 'https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp',
      publishDate: new Date(2023, 5, 5),
      price: 45000,
      views: 210,
      active: true,
    },
  ];

  showStatusModal = false;
  selectedCar: Car | null = null;

  openStatusModal(car: Car) {
    this.selectedCar = car;
    this.showStatusModal = true;
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.selectedCar = null;
  }

  toggleCarStatus() {
    if (this.selectedCar) {
      this.selectedCar.active = !this.selectedCar.active;
      this.closeStatusModal();
    }
  }

  // Dummy handlers for actions
  viewCar(car: Car) {
    alert(`Viewing details for ${car.brand} ${car.title}`);
  }

  editCar(car: Car) {
    alert(`Editing ${car.brand} ${car.title}`);
  }

  deleteCar(car: Car) {
    if (confirm(`Are you sure you want to delete ${car.brand} ${car.title}?`)) {
      this.cars = this.cars.filter(c => c.id !== car.id);
    }
  }
}
