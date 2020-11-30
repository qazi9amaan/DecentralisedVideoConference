import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
    private socket: any;
  constructor() {
    this.socket = io("https://aselpanda.ml/");
  }

  listen(eventname: string) : Observable<any> {
      return new Observable((subscriber:any) => {
          this.socket.on(eventname, (data:any) => {
            console.log(data);
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




