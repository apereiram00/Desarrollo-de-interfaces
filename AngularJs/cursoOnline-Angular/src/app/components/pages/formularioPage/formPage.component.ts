import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'formPage',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './formPage.component.html',
    styleUrls: ['./formPage.component.css']
})

export class FormPage implements OnInit {
    ngOnInit(): void {
    }
}