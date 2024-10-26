import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyguyService } from '../../services/familyguy.service';

@Component({
  selector: 'app-familyguy-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './familyguy.component.html',
  styleUrls: ['./familyguy.component.css'],
})
export class FamilyguyComponent implements OnInit {
  characters: any[] = [];

  constructor(private familyGuyService: FamilyguyService) {}

  ngOnInit(): void {
    this.buscarPersonajes();
  }

  buscarPersonajes(): void {
    this.familyGuyService.getCharacters().subscribe(data => {
      this.characters = data.filter(character => character.character.image);
    });
  }
}
