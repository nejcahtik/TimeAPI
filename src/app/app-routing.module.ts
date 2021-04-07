import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TokenComponent } from "./token/token.component";
import { PresenceComponent } from "./presence/presence.component";

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: "token", component: TokenComponent },
  { path: "presence", component: PresenceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }