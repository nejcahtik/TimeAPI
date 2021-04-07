import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { User } from "../User";
import { MessageService } from '../message.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
    private messageService: MessageService,) { }

  public searchText = "";
  users: User[] = [];
  selectedUser?: User;


  userFirstName: string = "";
  userLastName: string = "";
  userEmail: string = "";
  tokenVisible: boolean = true;

  token: string | null = "";

  addNewUser(FirstName: string, LastName: string, Email: string): void {

    if(this.token != null) {
      this.userService.setUser({ FirstName, LastName, Email } as User, this.token)
        .subscribe(user => {
          console.log(user);
          this.users.push(user.data);
        });
      }
  }

  getUsers(): void {
    this.tokenVisible = false;

    if(this.token != null) {
      this.userService.getUsers(this.token)
        .subscribe(users => {
          console.log(users);
          this.users = users.data;

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
