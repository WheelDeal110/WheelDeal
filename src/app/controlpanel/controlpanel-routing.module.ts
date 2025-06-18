import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { CarListingComponent } from './car-listing/car-listing.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MyFavComponent } from './my-fav/my-fav.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent   },
      { path: 'settings', component: SettingsComponent   },
      { path: 'carListing', component: CarListingComponent   },
      { path: 'myListing', component: MyListingsComponent   },
      { path: 'myFav', component: MyFavComponent   },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlpanelRoutingModule { }
