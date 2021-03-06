import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ChatappComponent } from './chatapp/chatapp.component';


const routes: Routes = [
  { path: 'portal', component: ChatappComponent },
  { path: 'login', component: UserComponent },
  { path: 'register', component: UserComponent },
  { path: '', redirectTo: '/portal', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
