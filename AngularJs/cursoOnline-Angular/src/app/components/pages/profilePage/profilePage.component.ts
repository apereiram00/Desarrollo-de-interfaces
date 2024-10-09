import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'profilePage',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profilePage.component.html',
    styleUrls: ['./profilePage.component.css']
})

export class ProfilePage implements OnInit {
    ngOnInit(): void {
    }
}