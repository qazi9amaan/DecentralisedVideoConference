import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import * as Peer from 'peerjs';
import {SocketioService} from '../../services/socketio.service';

const peers:any = {};

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: string ="";
  output: any[] = [];
  userName: string ="";
  message: string ="";
  feedback : string ="";

  constructor(
    private route: ActivatedRoute,private socketService: SocketioService) { 
      this.room = this.route.snapshot.paramMap.get('room') || "";
      this.userName = this.route.snapshot.paramMap.get('name') || "";

    }

  
 

  ngOnInit() {
    this.room = this.route.snapshot.paramMap.get('room') || "";
    this.userName = this.route.snapshot.paramMap.get('name') || "";

    this.socketService.emitMultipleArgs('join-room', this.room,this.userName); 
    this.socketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.socketService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.socketService.listen('user-connected').subscribe((data) => this.connectNewUser(data));
    this.socketService.listen('user-disconnected').subscribe((data) => this.disconnectUser(data));

  }

  messageTyping(e:any): void {
    if (e.which == 13) {
      this.sendMessage();
    }else{
      this.socketService.emit('typing', this.userName); 
    }
  }

  sendMessage(): void {
    this.socketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";    
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    if(data.handle == this.userName)
    {
      data.type = "msg-sender"
    }else{
      data.type = "msg-reciever"
    }
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }
  
  disconnectUser(data:any){
    if(!!!data) return;
    this.output.push({
      message: `Ahan! ${data} left the room`,
      handle: "",
      type : "helper"

    });
  }

  connectNewUser(data:any){
    if(!!!data) return;
    this.output.push({
      message: `Hey! ${data} joined the room`,
      type : "helper",
      handle: ""

    });
  }
    
  }

  

 