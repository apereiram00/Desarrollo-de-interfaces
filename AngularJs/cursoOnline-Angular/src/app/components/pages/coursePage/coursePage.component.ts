import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
@Component({
    selector: 'coursePage',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './coursePage.component.html',
    styleUrls: ['./coursePage.component.css']
})

export class CoursePage implements OnInit {
    ngOnInit(): void {
    }
}