import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpsonsService } from '../../services/simpsons.service';

@Component({
  selector: 'app-simpsons-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simpsons.component.html',
  styleUrls: ['./simpsons.component.css'],
})
export class SimpsonsComponent implements OnInit {
  characters: any[] = [];

  constructor(private familyGuyService: SimpsonsService) {}

  ngOnInit(): void {
    this.buscarPersonajes();
  }

  buscarPersonajes(): void {
    this.familyGuyService.getCharacters().subscribe(data => {
      this.characters = data.filter(character => character.character.image);
    });
  }
}
