import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './components/room/room.component';
import { ConnectComponent } from './components/connect/connect.component';
import {SocketioService} from './services/socketio.service';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    ConnectComponent
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
