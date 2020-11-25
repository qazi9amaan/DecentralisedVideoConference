import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomComponent} from './components/room/room.component';
import {ConnectComponent} from './components/connect/connect.component';
import { UUID } from 'angular2-uuid';

const routes: Routes = [
  {path:"",component:ConnectComponent},
  {path:"room/:room",component:RoomComponent},
  {path:"new-room",
   redirectTo: `room/${UUID.UUID()}`, 
   pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
