import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ModalController } from '@ionic/angular';
import { ModalPeliculaComponent } from '../modal-pelicula/modal-pelicula.component';

interface Pelicula {
  titulo: string;
  descripcion: string;
  imagen: string;
  vista: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  peliculas: Pelicula[] = []; 
  peliculaForm: FormGroup; 

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder 
  ) {
    this.peliculaForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: [''],
    });
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalPeliculaComponent,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.peliculas.push(data);
    }
  }

  eliminarPelicula(item: Pelicula) {
    this.peliculas = this.peliculas.filter((pelicula) => pelicula !== item);
  }

  marcarComoVista(item: Pelicula) {
    item.vista = !item.vista;
  }
}
