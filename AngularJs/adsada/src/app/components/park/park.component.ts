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
    } else {
      alert('No tienes suficientes monedas para mejorar este dinosaurio.');
    }
  }

  contrabando() {
    const earnedCoins = Math.floor(Math.random() * 100) + 1;
    this.parkStatus.coins += earnedCoins;
    this.updateCoins();
  }

  loadParkStatus() {
    this.parkService.getParkStatus().subscribe(status => {
      this.parkStatus = status;
      this.parkStatus.dinosaurs = [];
      this.parkStatus.enclosures = [];
      if (!this.parkStatus.coins) {
        this.parkStatus.coins = 500;
      }
      this.updateCoins();
    });
  }

  updateCoins() {
    console.log(`Monedas actuales: ${this.parkStatus.coins}`);
  }
  showDinosaurInfo(dinosaur: Dinosaur) {
    alert(`ESPECIE: ${dinosaur.scientificName}`);
  }

  showEnclosureInfo(enclosure: Enclosure) {
    alert(`${enclosure.description}`);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
