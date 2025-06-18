import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlpanelRoutingModule } from './controlpanel-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarListingComponent } from './car-listing/car-listing.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MyFavComponent } from './my-fav/my-fav.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    CarListingComponent,
    MyListingsComponent,
    MyFavComponent
  ],
  imports: [
    CommonModule,
    ControlpanelRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ControlpanelModule { }
