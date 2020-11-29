import { Component, OnInit ,AfterViewInit,ViewChild ,ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {SocketioService} from '../../services/socketio.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit  {

  @ViewChild('mvideo', { static: true })
  mvideo!: ElementRef;

  room: string ="";
  output: any[] = [];
  userName: string ="";
  message: string ="";
  feedback : string ="";
  myvideostream : any = null;
  myPeer :any;
  peers:any = {};
  connectedUsers: any[] = [];
  muteBtn :any ="fas fa-microphone";
  showVideo :any ="fas fa-video";
  newusercount :any =0;
  showusercount :any =0;

  constructor(
    private route: ActivatedRoute,private socketService: SocketioService
    ) { 
      this.room = this.route.snapshot.paramMap.get('room') || "";
      this.userName = this.route.snapshot.paramMap.get('name') || "";
    }



 
  async loadMedia() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      this.addmVideoStream(stream)
    });
  
  }

  ngOnInit() {
    this.myPeer = new Peer(undefined);
    this.room = this.route.snapshot.paramMap.get('room') || "";
    this.userName = this.route.snapshot.paramMap.get('name') || "";
    this.myPeer.on('open', (id:any) => {
      this.socketService.emitMultipleArgs('join-room', this.room,id);
    })
    this.loadMedia();

    this.myPeer.on('call', (call:any) => {
      call.answer(this.myvideostream)
     
      const video = document.createElement('video')
      call.on('stream', (userVideoStream:any) => {
        this.addmVideoStream(this.myvideostream);
        console.log("recieving :: " + userVideoStream)
       
        if(this.showusercount %2 == 0)
        {
          this.connectedUsers.push({
            stream:userVideoStream,
            username:call.peer
          });    
          this.showusercount = this.showusercount+1;

        }

        this.peers[parseInt(call.peer)]=call

      })
      this.connectedUsers.pop()

      call.on('close', () => {
        if (this.peers[call.peer]) {
          this.peers[call.peer].close()
          this.removeItem(call.peer);
        }
      })
    
    })

    this.socketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.socketService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.socketService.listen('user-connected').subscribe((data) => this.connectNewUser(data));
    this.socketService.listen('user-disconnected').subscribe((data) => this.disconnectUser(data));
  }

  
   initNewUser(userId:string) {
    var stream = this.myvideostream;
    
    var call = this.myPeer.call(userId, stream);
    call.on('stream', (userVideoStream:any) => {
      this.addmVideoStream(stream)
      console.log(this.newusercount);
      if(this.newusercount %2 == 0)
      {
        this.connectedUsers.push({
          stream:userVideoStream,
          username:userId
        });
        this.newusercount = this.newusercount+1;

      }

    })

    call.on('close', () => {
      this.removeItem(userId);
      this.peers[userId].close()
    })
    this.peers[userId] = call
  }
  

  addmVideoStream(stream:any){
    var mvideo = this.mvideo.nativeElement;
    mvideo.srcObject= stream;
    mvideo.muted = true;
    this.myvideostream = stream;
    mvideo.addEventListener('loadedmetadata', () => {
      mvideo.play()
    })
  }

  removeItem(value:any){
    var myEl =document.querySelector( '#peer-'+value ) ;
    console.log(myEl)
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
    this.removeItem(data)
  }

  connectNewUser(data:any){
    if(!!!data) return;
    this.output.push({
      message: `Hey! ${data} joined the room`,
      type : "helper",
      handle: ""

    });
    this.initNewUser(data);
  }
    
  expand_to_screen(a:any){
    console.log("expanding....")
    this.expand(this.mvideo.nativeElement);
  }

   expand(elem :any)
  {
    elem.requestFullscreen();
    elem.mozRequestFullScreen();
    elem.webkitRequestFullscreen();
    elem.msRequestFullscreen();
  }

   muteUnmute(){
    const enabled = this.myvideostream.getAudioTracks()[0].enabled;
    if (enabled) {
      this.myvideostream.getAudioTracks()[0].enabled = false;
      this.setUnmuteButton();
    } else {
      this.setMuteButton();
      this.myvideostream.getAudioTracks()[0].enabled = true;
    }
  }
   playStop(){
    let enabled = this.myvideostream.getVideoTracks()[0].enabled;
    if (enabled) {
      this.myvideostream.getVideoTracks()[0].enabled = false;
      this.setPlayVideo()
    } else {
      this.setStopVideo()
      this.myvideostream.getVideoTracks()[0].enabled = true;
    }
  }
  setMuteButton() {
    this.muteBtn = " fas fa-microphone";

  }
   setUnmuteButton(){
    this.muteBtn = " fas fa-microphone-slash";
  }

  setStopVideo (){
    this.showVideo = "fas fa-video";
  }
  
  setPlayVideo(){
    this.showVideo = "fas fa-video-slash";
  }

  screenshare(med :any){
    console.log('aa');
  }

  }

  

 