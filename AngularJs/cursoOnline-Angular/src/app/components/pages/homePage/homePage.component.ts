import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
@Component({
    selector: 'homePage',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './homePage.component.html',
    styleUrls: ['./homePage.component.css']
})

export class HomePage implements OnInit {
    ngOnInit(): void {
    }
}