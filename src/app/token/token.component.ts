import { Component, OnInit, Input } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { TOKEN_SESSION } from '../tokenstorage';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {

  public token: string = "";
  showTokenSaved: boolean = false;


  constructor(private messageService: MessageService,
    @Inject(TOKEN_SESSION) private localStorage: Storage,) { }

  save() {
    this.log("saving token");
    this.showTokenSaved = true;
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  ngOnInit(): void {
  }

}
