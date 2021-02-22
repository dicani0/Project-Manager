import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers() {
        return this.http.get<User[]>(environment.baseUrl + 'users')
            .pipe(map(users => {
                return users.map(user => {
                    return user = new User(user);
                })
            }))
    }
}
