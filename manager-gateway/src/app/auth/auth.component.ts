import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    host: {
        class: 'flex-1 flex'
    }
})
export class AuthComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
