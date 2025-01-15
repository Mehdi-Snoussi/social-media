import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    HomeComponent, 
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
