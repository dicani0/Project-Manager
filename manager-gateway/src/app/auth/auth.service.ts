import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    isLoggedIn = new BehaviorSubject<boolean>(null);
    loadedUser$ = new BehaviorSubject<User>(null);
    loadedUser: User;
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(environment.baseUrl + 'login',
            {
                'email': email,
                'password': password
            })
            .pipe(
                catchError(err => throwError(err)),
                tap(
                    data => {
                        this.loadedUser = new User(data.user.id, data.user.name, data.user.email);
                        localStorage.setItem('apiToken', data.token);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        this.isLoggedIn.next(true);
                        this.loadedUser$.next(this.loadedUser);
                        console.log(localStorage.getItem('user'));
                    }
                ));
    }

    autoLogin() {
        if (!localStorage.getItem('apiToken')) {
            this.isLoggedIn.next(false);
            return;
        }
        this.loadedUser = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn.next(true);

    }

    isLogged(): boolean {
        if (!!localStorage.getItem('apiToken')) {
            return true;
        }
        return false;
    }

    register(username: string, email: string, password: string) {
        return this.http.post(environment.baseUrl + "register",
            {
                name: username,
                email: email,
                password: password
            })
            .pipe(
                catchError(err => throwError(err))
            );
    }

    logout() {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('user');
        this.isLoggedIn.next(false);
    }

    test() {
        return this.http.get<any>(environment.baseUrl + 'test').subscribe(res => {
        });
    }
}