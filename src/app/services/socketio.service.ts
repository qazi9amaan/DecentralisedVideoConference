import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
    private socket: any;
  constructor() {
    this.socket = io("http://localhost:3000");
  }

  listen(eventname: string) : Observable<any> {
      return new Observable((subscriber:any) => {
          this.socket.on(eventname, (data:any) => {
              subscriber.next(data);
          })
      })
  }

  emit(eventname: string, data: any) {
      this.socket.emit(eventname, data);
  }
  emitMultipleArgs(eventname: string, data: any,data2: any) {
    this.socket.emit(eventname, data,data2);
}


}




