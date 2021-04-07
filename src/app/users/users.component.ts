import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { User } from "../User";
import { MessageService } from '../message.service';
import { Inject, Injectable } from '@angular/core';
import { TOKEN_SESSION } from '../tokenstorage';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
    private messageService: MessageService,
    @Inject(TOKEN_SESSION) private localStorage: Storage,) { }

  public searchText = "";
  users: User[] = [];


  userFirstName: string = "";
  userLastName: string = "";
  userEmail: string = "";

  token: string | null = "";

  addNewUser(FirstName: string, LastName: string, Email: string): void {

    this.token = this.localStorage.getItem("spica_token");

    if (!(this.token === null)) {

      this.userService.setUser({ FirstName, LastName, Email } as User, this.token)
        .subscribe(user => {
          console.log(user);
          this.users.push(user.data);
        });
    }
  }

  getUsers(): void {

    this.token = this.localStorage.getItem("spica_token");

    if (!(this.token === null)) {


      this.userService.getUsers(this.token)
        .subscribe(users => {
          console.log(users);
          this.users = users.data;
          if (this.users == null) {
          }

        });
    }
  }

  private log(message: string) {
    this.messageService.add(`UserComponent: ${message}`);
  }


  ngOnInit(): void {

    this.log("initializing user component");
    this.getUsers();
  }
}
