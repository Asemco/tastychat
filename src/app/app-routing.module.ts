import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '/', component: ChatboxComponent },
  { path: 'login', component: UserComponent },
  { path: 'register', component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
