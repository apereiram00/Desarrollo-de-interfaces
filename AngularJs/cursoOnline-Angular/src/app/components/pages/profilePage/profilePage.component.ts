import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'profilePage',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './profilePage.component.html',
    styleUrls: ['./profilePage.component.css']
})

export class ProfilePage implements OnInit {
    ngOnInit(): void {
    }
}