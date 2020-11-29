import { Component, AfterViewInit ,ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements AfterViewInit  {
  roomnumber : string ="";
  message : string = 'Please provide the name & the room number';
  name : string ="";
  helptext :boolean = true;
  constructor(private router: Router) {
  }

  validateinput(event: any){
    if(event.target.value == ""){
      this.message = "Please provide valid input for name";
      this.helptext = false;
    }else{
      this.roomnumber = event.target.value;
      this.message = "Please be patient, while we connect you!";
      this.helptext = true;
    }
  }
  validateroom(event: any){
    if(event.target.value == ""){
      this.message = "Please provide valid input for room ";
      this.helptext = false;
    }else{
      this.roomnumber = event.target.value.replace(" ","_");
      this.message = "Please be patient, while we connect you!";
      this.helptext = true;
    }
  }
  joinRoom(event:any){
    if(this.roomnumber != "" && this.name != ""){
      this.router.navigate([`room/${this.roomnumber}/${this.name}`]);

    }else{
      this.helptext = false;
      this.message = "Please provide valid input";

    }
  }


  ngAfterViewInit() {
  }
  
}
