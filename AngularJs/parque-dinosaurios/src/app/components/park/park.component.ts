import { Component, OnInit } from '@angular/core';
import { ParkService } from '../../services/park.service';
import { DinosaurService } from '../../services/dinosaur.service';
import { EnclosureService } from '../../services/enclosure.service';
import { Router } from '@angular/router';
import { Dinosaur } from '../../models/dinosaur.model';
import { Enclosure } from '../../models/enclosure.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-park',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css'],
})
export class ParkComponent implements OnInit {
  parkStatus: any;
  dinosaurs: Dinosaur[] = [];
  enclosures: Enclosure[] = [];
  visitors: number = 0;

  constructor(
    private parkService: ParkService,
    private dinosaurService: DinosaurService,
    private enclosureService: EnclosureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadParkStatus();
  }

  updateVisitors() {
    const randomIncrement = Math.floor(Math.random() * (100 - 10 + 1)) + 10; 
    this.visitors += randomIncrement;
  }

  unlockRandomDinosaur() {
    this.dinosaurService.getDinosaurs().subscribe(dinosaurs => {
      if (dinosaurs.length === 0) {
        alert('No hay dinosaurios disponibles para desbloquear.');
        return;
      }

      const randomDinosaurIndex = Math.floor(Math.random() * dinosaurs.length);
      const dinosaur = dinosaurs[randomDinosaurIndex];

      if (this.parkStatus.coins >= dinosaur.cost) {
        if (!this.parkStatus.dinosaurs.includes(dinosaur.id)) {
          this.parkStatus.coins -= dinosaur.cost;
          this.parkStatus.dinosaurs.push(dinosaur.id);
          alert(`Nuevo dinosaurio desbloqueado: ${dinosaur.name}`);
          this.updateVisitors();
        } else {
          alert(`${dinosaur.name} ya está desbloqueado.`);
        }

        this.updateCoins();
        this.syncDinosaurs();
        this.updateParkStatus(); 
      } else {
        alert('No tienes suficientes billetes para desbloquear este dinosaurio.');
      }
    });
  }

  unlockRandomEnclosure() {
    this.enclosureService.getEnclosures().subscribe(enclosures => {
      if (enclosures.length === 0) {
        alert('No hay recintos disponibles para desbloquear.');
        return;
      }

      const randomEnclosureIndex = Math.floor(Math.random() * enclosures.length);
      const enclosure = enclosures[randomEnclosureIndex];

      if (this.parkStatus.coins >= enclosure.cost) {
        if (!this.parkStatus.enclosures.includes(enclosure.id)) {
          this.parkStatus.coins -= enclosure.cost;
          this.parkStatus.enclosures.push(enclosure.id);
          alert(`Nuevo recinto desbloqueado: ${enclosure.name}`);
          this.updateVisitors();
        } else {
          alert(`${enclosure.name} ya está desbloqueado.`);
        }

        this.updateCoins();
        this.syncEnclosures();
        this.updateParkStatus(); 
      } else {
        alert('No tienes suficientes billetes para desbloquear este recinto.');
      }
    });
  }

  upgradeEnclosure(enclosure: Enclosure) {
    const upgradeCost = Math.round(enclosure.cost * 1.5); 
  
    if (this.parkStatus.coins >= upgradeCost) {
      this.parkStatus.coins -= upgradeCost; 
      enclosure.cost = upgradeCost; 
      alert(`¡El recinto ${enclosure.name} ha sido mejorado!`);
      this.updateCoins();  
      this.syncEnclosures();
      this.updateParkStatus(); 
    } else {
      alert('No tienes suficientes monedas para mejorar este recinto.');
    }
  }

  syncDinosaurs() {
    this.dinosaurs = [];
    this.dinosaurService.getDinosaurs().subscribe(dinosaurs => {
      this.dinosaurs = dinosaurs.filter(dino => this.parkStatus.dinosaurs.includes(dino.id));
    });
  }

  syncEnclosures() {
    this.enclosures = [];
    this.enclosureService.getEnclosures().subscribe(enclosures => {
      this.enclosures = enclosures.filter(enclo => this.parkStatus.enclosures.includes(enclo.id));
    });
  }

  upgradeDinosaur(dinosaur: Dinosaur) {
    const newCost = dinosaur.cost * 1.5; 
    if (this.parkStatus.coins >= newCost) {
      dinosaur.cost = newCost; 
      alert(`¡El dinosaurio ${dinosaur.name} ha sido mejorado! Nuevo precio: ${newCost}`);
      this.parkStatus.coins -= newCost; 
      this.updateCoins();
      this.updateParkStatus(); 
    } else {
      alert('No tienes suficientes monedas para mejorar este dinosaurio.');
    }
  }

  contrabando() {
    const earnedCoins = Math.floor(Math.random() * 100) + 1;
    this.parkStatus.coins += earnedCoins;
    this.updateCoins();
    this.updateParkStatus(); 
  }

  loadParkStatus() {
    this.parkService.getParkStatus().subscribe(
      (status) => {
        this.parkStatus = {
          ...status,
          dinosaurs: status.dinosaurIds || [],
          enclosures: status.recintosIds || [],
          coins: status.coins || 500,
        };
  
        this.syncDinosaurs();
        this.syncEnclosures();
        console.log('Estado del parque cargado:', this.parkStatus);
      },
      (error) => {
        console.error('Error al cargar el estado del parque:', error);
        alert('Hubo un problema al cargar el estado del parque.');
      }
    );
  }

  updateCoins() {
    console.log(`Monedas actuales: ${this.parkStatus.coins}`);
  }

  updateParkStatus() {
    this.parkService.updateParkStatus(this.parkStatus).subscribe(
      () => console.log('Estado del parque sincronizado con el backend'),
      (error) => console.error('Error al sincronizar el estado del parque:', error)
    );
  }

  showDinosaurInfo(dinosaur: Dinosaur) {
    alert(`ESPECIE: ${dinosaur.scientificName}`);
  }

  showEnclosureInfo(enclosure: Enclosure) {
    alert(`${enclosure.description}`);
  }

  logout() {
    this.parkService.updateParkStatus(this.parkStatus).subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al sincronizar el estado antes de cerrar sesión:', error);
        alert('Hubo un problema al guardar el estado del parque.');
      }
    );
  }
}
