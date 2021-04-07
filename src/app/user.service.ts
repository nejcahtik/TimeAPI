import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    //todo
  }

  setUser(user: User, token: string): Observable<any> {
     //todo
  }
  getPresentUsers(token: string): Observable<Data> {
    //todo

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


