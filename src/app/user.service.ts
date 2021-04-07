import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  properties: any;

  private usersUrl = ' http://rdweb.spica.com:5213/timeapi';

  constructor(private messageService: MessageService,
    private http: HttpClient) {
  
  }

  

  getUsers(token: string): Observable<Data>{

    this.properties = {
        headers: new HttpHeaders({
          'Authorization': token,
        })
      }

    return this.http.get<Data>(this.usersUrl + "/Employee", this.properties)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<Data>('getUsers', []))
      );
  }

  setUser(user: User, token: string): Observable<any> {

    this.properties = {
      headers: new HttpHeaders({
        'Authorization': token,
      })
    }

    return this.http.put<Data>(this.usersUrl + "/Employee", user, this.properties)
      .pipe(
        tap(_ => this.log("updated user name=${user.FirstName}, lastname=${user.LastName}"),
          catchError(this.handleError<any>('setUser'))));
  }

  getPresentUsers(token: string): Observable<Data> {

    this.properties = {
      headers: new HttpHeaders({
        'Authorization': token,
      })
    }

    return this.http.get<Data>(this.usersUrl + "/Presence?TimeStamp=" + (new Date().toISOString()) + "&OrgUnitID=10000000&showInactiveEmployees=false", this.properties)
      .pipe(
        tap(_ => this.log('fetched present users')),
        catchError(this.handleError<Data>('getPresentUsers', []))
      );
  }
  

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
  };
}

}


