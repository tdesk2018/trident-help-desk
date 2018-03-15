import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Book } from '../_models/index';
import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        //return this.http.post<any>('http://34.192.184.245:3000/notes' + '/users/authenticate', { username: username, password: password })

       return this.http.post<any>(appConfig.apiUrl + '/users/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    ticinfo(ownername: string){
        console.log(ownername);
        return this.http.post<any>(appConfig.apiUrl + '/users/ticketinfo', { ownername: ownername })
        .map(ticket => {
            // login successful if there's a jwt token in the response
            if (ticket ) {
                return ticket;
            }

            
        });
    }
    
    ticinform(status: string){
        return this.http.post<any>(appConfig.apiUrl + '/users/ticketinform', { status: status })
        .map(ticket => {
            
            if (ticket ) {
                return ticket;
            }

            
        });
    }

    update(ownername: string,status: string,priority:string){
        return this.http.post(appConfig.apiUrl + '/users/', { ownername: ownername,status:status,priority:priority })
        .map(ticket => {
            
            if (ticket ) {
                return ticket;
            }

            
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}