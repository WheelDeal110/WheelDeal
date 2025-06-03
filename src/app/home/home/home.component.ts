import { Component } from '@angular/core';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
filters = {
    price: 100000,
    make: '',
    year: ''
  };

  carMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Audi'];
  years: number[] = [];

  cars: Car[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: 25000,
      image: 'assets/images/car1.jpg'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      price: 18000,
      image: 'assets/images/car2.jpg'
    },
    {
      id: 3,
      make: 'BMW',
      model: 'X5',
      year: 2022,
      price: 50000,
      image: 'assets/images/car3.jpg'
    }
    // Add more cars if you want
  ];

  filteredCars: Car[] = [];

  ngOnInit() {
    this.generateYears();
    this.applyFilters();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for(let y = currentYear; y >= 1990; y--) {
      this.years.push(y);
    }
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const matchesPrice = car.price <= this.filters.price;
      const matchesMake = this.filters.make ? car.make === this.filters.make : true;
      const matchesYear = this.filters.year ? car.year === +this.filters.year : true;
      return matchesPrice && matchesMake && matchesYear;
    });
  }
}
