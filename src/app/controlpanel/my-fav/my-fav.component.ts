import { Component } from '@angular/core';

interface Car {
  id: number;
  status?: 'Used' | 'New';
  imageUrl: string;
  title: string;
  rating: number;
  reviews: string;
  transmission: string;
  model: string;
  mileage: string;
  fuelType: string;
  price: string;
}

@Component({
  selector: 'app-my-fav',
  templateUrl: './my-fav.component.html',
  styleUrls: ['./my-fav.component.css']
})
export class MyFavComponent {
   cars: Car[] = [
    {
      id: 1,
      status: 'Used',
      imageUrl: 'https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp',
      title: 'Mercedes Benz Car',
      rating: 5,
      reviews: '58.5k Review',
      transmission: 'Automatic',
      model: '2023',
      mileage: '10.15km / 1-litre',
      fuelType: 'Hybrid',
      price: '$45,620',
    },
    {
      id: 2,
      imageUrl: 'https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp',
      title: 'Yellow Ferrari 458',
      rating: 5,
      reviews: '58.5k Review',
      transmission: 'Automatic',
      model: '2023',
      mileage: '10.15km / 1-litre',
      fuelType: 'Hybrid',
      price: '$90,250',
    },
    // Add more car objects here ...
  ];

  // Methods for buttons (remove favorite, refresh, etc)
  removeFavorite(id: number) {
    this.cars = this.cars.filter(car => car.id !== id);
  }
  
  refreshCar(id: number) {
    alert(`Refresh data for car id: ${id}`);
  }
}
