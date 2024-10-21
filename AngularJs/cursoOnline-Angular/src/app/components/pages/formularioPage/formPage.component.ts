import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: 'formPage',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './formPage.component.html',
    styleUrls: ['./formPage.component.css']
})

export class FormPage implements OnInit {
    formId: string = '';  
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {this.formId = params.get('id') || ''});
    }

    estaForm1(): boolean {
        return this.formId === '1';
    }

    estaForm2(): boolean {
        return this.formId === '2';
    }

    estaForm3(): boolean {
        return this.formId === '3';
    }
}