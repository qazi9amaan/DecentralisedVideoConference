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
  

    mitronPeers: Array<MitronPeer> = new Array()

  @ViewChild('myVideo')
  myVideo: ElementRef<HTMLVideoElement>

  @ViewChildren('peerVideo')
  peerVideos: QueryList<ElementRef<HTMLVideoElement>>

  constructor(private route: ActivatedRoute,private socketService: SocketioService,) { 
    this.room = "";
  }

  
 

  ngOnInit() {

    this.room = this.route.snapshot.paramMap.get('room') || "";
    this.socketService.setupSocketConnection();

    navigator.mediaDevices
    .getUserMedia({ video: { width: 300, height: 300 }, audio: true })
      .then(stream => {

        this.myVideo.nativeElement.srcObject = stream
        this.myVideo.nativeElement.play()

        this.signalingService.connect()

        this.signalingService.onConnect(() => {

          console.log(`My Socket Id ${this.signalingService.socketId}`)

          this.signalingService.requestForJoiningRoom({ roomName: this.roomName })

          this.signalingService.onRoomParticipants(participants => {
            console.log(`${this.signalingService.socketId} - On Room Participants`)
            console.log(participants)

            //this.signalingService.sendOfferSignal({ signalData: { type: 'offer', sdp: 'kldjfdfkgjdkjk' }, callerId: this.signalingService.socketId, calleeId: participants.find(id => id != this.signalingService.socketId) })
            this.initilizePeersAsCaller(participants, stream)
          })

          this.signalingService.onOffer(msg => {
            this.initilizePeersAsCallee(msg, stream)
          })

          this.signalingService.onAnswer(msg => {
            console.log(`${this.signalingService.socketId} - You got Answer from ${msg.calleeId}`)
            const mitronPeer = this.mitronPeers.find(mitronPeer => mitronPeer.peerId === msg.calleeId)
            mitronPeer.peer.signal(msg.signalData)
          })

          this.signalingService.onRoomLeft(socketId => {
            this.mitronPeers = this.mitronPeers.filter(mitronPeer => socketId != mitronPeer.peerId)
          })
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  initilizePeersAsCaller(participants: Array<string>, stream: MediaStream) {
    const participantsExcludingMe = participants.filter(id => id != this.signalingService.socketId)
    participantsExcludingMe.forEach(peerId => {

      const peer: SimplePeer.Instance = new SimplePeer({
        initiator: true,
        trickle: false,
        stream
      })

      peer.on('signal', signal => {
        console.log(`${this.signalingService.socketId} Caller Block ${signal}`)
        this.signalingService.sendOfferSignal({ signalData: signal, callerId: this.signalingService.socketId, calleeId: peerId })
      })

      // peer.on('stream', stream => {
      //   this.peerVideos.first.nativeElement.srcObject = stream
      //   this.peerVideos.first.nativeElement.play()
      // })
      this.mitronPeers.push({ peerId: peerId, peer: peer })
    })
  }

  initilizePeersAsCallee(msg: SignalMessage, stream: MediaStream) {
    console.log(`${this.signalingService.socketId} You have an offer from ${msg.callerId}`)
    // this.signalingService.sendAnswerSignal({ signalData: msg.signalData, callerId: msg.callerId })

    const peer: SimplePeer.Instance = new SimplePeer({
      initiator: false,
      trickle: false,
      stream
    })

    peer.on('signal', signal => {
      console.log(`${this.signalingService.socketId} Callee Block ${signal}`)
      this.signalingService.sendAnswerSignal({ signalData: signal, callerId: msg.callerId })
    })

    peer.signal(msg.signalData)
    this.mitronPeers.push({ peerId: msg.callerId, peer: peer })
  }

    
    
  }

  

 
   // postAboutpeer(msg:string){
  //   var newUser = document.createElement('div');
  //   newUser.className ='helper';
  //   newUser.innerHTML=msg;
  //   // this.messages.nativeElement.append(newUser);
  //   console.log(msg)
  // }



}
