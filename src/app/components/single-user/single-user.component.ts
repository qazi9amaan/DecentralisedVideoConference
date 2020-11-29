import { Component, AfterContentInit,ViewChild ,ElementRef,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  @Input() user :any;

  @ViewChild('uservideo', { static: true })
  uservideo!: ElementRef;
  username :string ="";
  userid :string ="";
  recipients:any = [];
  recipient = '';
  constructor() { 
  }

  ngOnInit(): void {
      this.addchildVideoStream(this.user.stream);
      this.userid = this.user.username;
      this.username = this.user.username;
  

  }

  addchildVideoStream(stream:any){
    var mvideo = this.uservideo.nativeElement;
    mvideo.srcObject= stream;
    mvideo.addEventListener('loadedmetadata', () => {
      mvideo.play()
    })
  }

  expand_to_screen(a:any){
    this.expand(this.uservideo.nativeElement);
  }

  expand(elem :any)
  {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  
  }
}
