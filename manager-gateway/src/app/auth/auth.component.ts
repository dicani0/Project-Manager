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
    registerForm: any;
    error: string[] = [];


    constructor(private authService: AuthService, private fb: FormBuilder) {
        if (!!localStorage.getItem('apiToken')) {
            this.isLoggedIn = true;
            this.loginMode = false;
        }
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required]
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
            this.error = [];
        },
            err => {
                this.error.push(err.error.message);
            })

    }

    onRegister() {
        const username = this.registerForm.get('username').value;
        const email = this.registerForm.get('email').value;
        const password = this.registerForm.get('password').value;
        this.authService.register(
            username,
            email,
            password
        ).subscribe(() => {
            this.error = [''];
            this.authService.login(email, password).subscribe()
        },
            error => {
                this.error = this.error.concat(error.error.name);
                this.error = this.error.concat(error.error.email);
                this.error = this.error.concat(error.error.password);
            });

    }
}