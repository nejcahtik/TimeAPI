import { Component, OnInit, Input } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { TOKEN_SESSION } from '../tokenstorage';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {

  public token: string = "";
  showTokenSaved: boolean = false;


  constructor(@Inject(TOKEN_SESSION) private localStorage: Storage,
    private messageService: MessageService) { }

  save() {
    this.localStorage.setItem("spica_token", this.token);
    this.showTokenSaved = true;
    this.log("saving token");
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  ngOnInit(): void {
  }

}
