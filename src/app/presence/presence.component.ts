import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { User } from "../User";
import { MessageService } from '../message.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  constructor(private userService: UserService,
    private messageService: MessageService) { }

  presentUsers: User[] = [];
  token: string | null = "";
  public searchText = "";

  refresh(): void {
    this.getPresentUsers();
  }

  getPresentUsers(): void {
    if(this.token != null) {
      this.userService.getPresentUsers(this.token)
        .subscribe(presentUsers => {
          console.log(presentUsers.length);
          this.presentUsers = presentUsers.data;

        });
    }
  }


  private log(message: string) {
    this.messageService.add(`PresenceComponent: ${message}`);
  }

  ngOnInit(): void {
    this.getPresentUsers();
  }
}
