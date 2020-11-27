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
  room: string;
  peer : any;
  mypeer : any;
  anotherid: any;
  

  //   mitronPeers: Array<MitronPeer> = new Array()

  // @ViewChild('myVideo')
  // myVideo: ElementRef<HTMLVideoElement>

  // @ViewChildren('peerVideo')
  // peerVideos: QueryList<ElementRef<HTMLVideoElement>>

  constructor(
    private route: ActivatedRoute,private socketService: SocketioService) { 
    this.room = "";
  }

  
 

  ngOnInit() {

    this.room = this.route.snapshot.paramMap.get('room') || "";
    this.socketService.setupSocketConnection();
    
  }



    
    
  }

  

 
   // postAboutpeer(msg:string){
  //   var newUser = document.createElement('div');
  //   newUser.className ='helper';
  //   newUser.innerHTML=msg;
  //   // this.messages.nativeElement.append(newUser);
  //   console.log(msg)
  // }



// }
