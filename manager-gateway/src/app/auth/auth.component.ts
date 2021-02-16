import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    host: {
        class: 'flex-1 flex flex-col'
    }
})
export class AuthComponent implements OnInit {
    loginMode: boolean = true;
    isLoggedIn: boolean = false;
    userForm: any;
    error: string;


    constructor(private authService: AuthService, private fb: FormBuilder) {
        if (!!localStorage.getItem('apiToken')) {
            this.isLoggedIn = true;
            this.loginMode = false;
        }
        this.userForm = this.fb.group({
            email: [''],
            password: ['']
        })
    }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(status => {
            this.isLoggedIn = status;
        })
    }

    onLogin() {
        this.authService.login(
            this.userForm.get('email').value,
            this.userForm.get('password').value
        ).subscribe(res => {
            this.error = '';
        },
            err => {
                this.error = err.error.message;
            })

    }

    onRegister() {
        // this.authService
    }

}
