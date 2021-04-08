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
  selectedUser?: User;


  userFirstName: string = "";
  userLastName: string = "";
  userEmail: string = "";
  tokenVisible: boolean = true;
  clickedOnAdd: boolean = false;
  showUserAdded: boolean = false;
  showDidntGetAnyUsers: boolean = false;
  notValidEmployee: boolean = false;

  token: string | null = "";

  addNewUser(FirstName: string, LastName: string, Email: string): void {
    this.clickedOnAdd = false;

    this.token = this.localStorage.getItem("spica_token");

    if (!(this.token === null)) {

      this.tokenVisible = false;

      if(!(FirstName === "") && !(LastName === "")) {

        this.notValidEmployee = false;

        this.userService.setUser({ FirstName, LastName, Email } as User, this.token)
          .subscribe(user => {
            console.log(user);
            this.showUserAdded = true;
            this.users.push(user.data);
          });
      }
      else {
        this.notValidEmployee = true;
      }
    }
    else {
      this.tokenVisible = true;
    }
  }

  clickToAdd(): void {
    this.clickedOnAdd = true;
    this.notValidEmployee = false;
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {

    this.token = this.localStorage.getItem("spica_token");

    if (!(this.token === null)) {

      this.tokenVisible = false;

      this.userService.getUsers(this.token)
        .subscribe(users => {
          console.log(users);
          this.users = users.data;
          if (this.users == null) {
            this.showDidntGetAnyUsers = true;
          }

        });
    }
    else {
      this.tokenVisible = true;
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
