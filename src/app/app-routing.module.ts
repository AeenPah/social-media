import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CanDeactivateGaurdLoginService } from './services/can-deactivate-gaurd-login.service';
import { SingUpComponent } from './sing-up/sing-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',canDeactivate:[CanDeactivateGaurdLoginService],component:LoginComponent},
  {path:'signup',canDeactivate:[CanDeactivateGaurdLoginService],component:SingUpComponent},
  {path:'profile',component:ProfileComponent},
  {path:'user-profile',component:UserProfileComponent},
  {path:'user-profile/:id',component:UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
