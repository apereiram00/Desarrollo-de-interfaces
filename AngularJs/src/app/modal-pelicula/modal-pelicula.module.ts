import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { IonicModule } from '@ionic/angular';  
import { ModalPeliculaComponent } from './modal-pelicula.component';  

@NgModule({
  declarations: [ModalPeliculaComponent],
  imports: [
    CommonModule,
    FormsModule,   
    IonicModule,
    ReactiveFormsModule  
  ],
})
export class ModalPeliculaModule {}
