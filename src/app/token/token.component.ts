import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {

  public token: string = "";
  showTokenSaved: boolean = false;


  constructor(
    private messageService: MessageService) { }

  save() {
    this.showTokenSaved = true;
    this.log("saving token");
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  ngOnInit(): void {
  }

}