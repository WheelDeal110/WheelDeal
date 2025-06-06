import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlpanelRoutingModule } from './controlpanel-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ControlpanelRoutingModule,
    FormsModule
  ]
})
export class ControlpanelModule { }
