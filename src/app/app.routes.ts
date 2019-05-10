import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import {AuthGuard} from './guard/auth.guard';
import {UserProfileComponent} from './user-profile/user-profile.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: UserProfileComponent },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: EditUserComponent, resolve: {data : EditUserResolver} }
];
