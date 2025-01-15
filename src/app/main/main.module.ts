import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component'; 
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent, 
    MainComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
