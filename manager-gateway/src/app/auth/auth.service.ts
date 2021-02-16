import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    isLoggedIn = new BehaviorSubject<boolean>(null);
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
                        localStorage.setItem('apiToken', data.token);
                        this.isLoggedIn.next(true);
                    }
                ));
    }

    autoLogin() {
        if (!localStorage.getItem('apiToken')) {
            this.isLoggedIn.next(false);
            return;
        }
        this.isLoggedIn.next(true);
    }

    register(username: string, email: string, password: string) {

    }

    logout() {
        localStorage.removeItem('apiToken');
        this.isLoggedIn.next(false);
    }

    test() {
        return this.http.get<any>(environment.baseUrl + 'test').subscribe(res => {
        });
    }
}