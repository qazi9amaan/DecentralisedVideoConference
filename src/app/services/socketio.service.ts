import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  
  socket:any;

  constructor() { }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('connection', (socket:any) => {
      socket.on('join-room', (roomId:string, userId:string) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        
        socket.on('message', (message:string) => {
          this.socket.to(roomId).emit('createMessage', message,userId)
        });
    
        socket.on('disconnect', () => {
          socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
      })
    })

  }

 
}




