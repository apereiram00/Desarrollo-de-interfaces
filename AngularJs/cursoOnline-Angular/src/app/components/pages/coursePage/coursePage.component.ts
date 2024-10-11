import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'coursePage',
    standalone: true, 
    imports: [CommonModule, RouterLink], 
    templateUrl: './coursePage.component.html',
    styleUrls: ['./coursePage.component.css']
})

export class CoursePage implements OnInit {
    courseId: string = '';  
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
          this.courseId = params.get('id') || '';
        });
    }

    estaEnCurso1(): boolean {
        return this.courseId === '1';
    }

    estaEnCurso2(): boolean {
        return this.courseId === '2';
    }

    estaEnCurso3(): boolean {
        return this.courseId === '3';
    }
}
