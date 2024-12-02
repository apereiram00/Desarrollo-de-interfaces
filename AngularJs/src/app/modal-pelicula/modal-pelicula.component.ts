import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-modal-pelicula',
  templateUrl: './modal-pelicula.component.html',
  styleUrls: ['./modal-pelicula.component.scss'],
})
export class ModalPeliculaComponent {
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

  guardarPelicula() {
    if (this.peliculaForm.valid) {
      const nuevaPelicula = {
        titulo: this.peliculaForm.value.titulo,
        descripcion: this.peliculaForm.value.descripcion,
        imagen: this.peliculaForm.value.imagen || 'https://via.placeholder.com/150',
        vista: false,
      };
      this.modalController.dismiss(nuevaPelicula);
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
