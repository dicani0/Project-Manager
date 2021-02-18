import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;
    user: User;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(token => {
            console.log(token);
            if (token) {
                this.isLoggedIn = true;
                this.user = this.authService.loadedUser;
                this.router.navigate(['dashboard'])
            }
            else {
                this.isLoggedIn = false;
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['auth']);
    }

    onTest() {
        this.authService.test();
    }

}
