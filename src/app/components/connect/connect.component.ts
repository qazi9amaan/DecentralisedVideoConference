import { Component, AfterViewInit ,ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements AfterViewInit  {
  roomnumber : string ="";
  message : string = 'Please provide the room number';
  helptext :boolean = true;
  constructor(private router: Router) {
  }

  validateinput(event: any){
    if(event.target.value == ""){
      this.message = "Room number cannot be null! Please provide valid input";
      this.helptext = false;
    }else{
      this.roomnumber = event.target.value;
      this.message = "Please be patient, while we connect you!";
      this.helptext = true;
    }
  }

  joinRoom(event:any){
    if(this.roomnumber != ""){
      this.router.navigate([`room/${this.roomnumber}`]);

    }else{
      this.helptext = false;
      this.message = "Room number cannot be null! Please provide valid input";

    }
  }

  ngAfterViewInit() {
  }
  
}
