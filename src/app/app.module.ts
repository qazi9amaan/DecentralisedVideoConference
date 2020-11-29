import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './components/room/room.component';
import { ConnectComponent } from './components/connect/connect.component';
import {SocketioService} from './services/socketio.service';
import { SingleUserComponent } from './components/single-user/single-user.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    ConnectComponent,
    SingleUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
