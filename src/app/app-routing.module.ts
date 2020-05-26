import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './profile/friends/friends.component';


const routes: Routes = [{
  path: 'profile', component: ProfileComponent, children:[
    { path: 'friends', component: FriendsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
