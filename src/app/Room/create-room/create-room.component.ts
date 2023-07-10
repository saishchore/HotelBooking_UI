import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from 'src/app/PojoClasses/Room';
import { RoomService } from 'src/app/Service/Room/room.service';


@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room : Room = new Room();
  rooms!: Observable<Room[]>;
  addForm!: FormGroup;
  Submitted: boolean=false;

  hotelId!:number;
    constructor(public service:RoomService,private router:Router, private formBuilder: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      // hotelId: ['',Validators.compose([ Validators.required,Validators.min(1)])],
       available: ['',Validators.compose([ Validators.required,Validators.minLength(1), Validators.maxLength(10)])],
       roomNo: ['',Validators.compose([ Validators.required,Validators.minLength(1),Validators.maxLength(3)])],
       roomType: ['',Validators.compose([ Validators.required,Validators.minLength(3), Validators.maxLength(20)])],
       ratePerDay: ['',Validators.compose([ Validators.required,Validators.min(1)])],
       
      });

      this.hotelId=parseInt(this.route.snapshot.paramMap.get('hotelId') as string);

  }
  saveRoom(){
    this.Submitted=true;
    
    if(this.addForm.invalid)
    {
      return;
    }
    else
    {
      this.room.hotelId=this.hotelId;
      this.service.createRoom(this.room)
     .subscribe(
       data => { console.log(data); this.router.navigate(['/roomdetails',this.hotelId])},
       error => { console.log(error);  alert(error);}
     );
    }
    
    
  }

}
