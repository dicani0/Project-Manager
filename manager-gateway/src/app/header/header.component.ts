import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(token => {
            console.log(token);
            if (token) {
                this.isLoggedIn = true;
            }
            else {
                this.isLoggedIn = false;
            }
        });
    }

    logout() {
        this.authService.logout();
    }

    onTest() {
        this.authService.test();
    }

}
