import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dates } from 'src/app/PojoClasses/Dates';
import { Room } from 'src/app/PojoClasses/Room';
import { RoomService } from 'src/app/Service/Room/room.service';


@Component({
  selector: 'app-roomdetails',
  templateUrl: './roomdetails.component.html',
  styleUrls: ['./roomdetails.component.css']
})
export class RoomdetailsComponent  implements OnInit   {
  update:boolean=false;
  details:boolean=false;
  search:string='';
  rooms!:Room[];
  room: Room= new Room();
  room1!:Room[];
  roomsAvailable!:Room[];
  dates:Dates= new Dates();

  Submitted: boolean=false;
  addForm!: FormGroup;
  hotelId:string='';
  searchStatus:boolean=true;
  adminId!:string;
  minDate:any;
  hotelRoom:boolean=false;
  
  constructor(private service:RoomService,private router:ActivatedRoute,private formBuilder: FormBuilder,private route: Router) { 
    
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      roomNo: ['',Validators.compose([ Validators.required,Validators.minLength(1),Validators.maxLength(3)])],
      roomType: ['',Validators.compose([ Validators.required,Validators.minLength(3), Validators.maxLength(20)])],  
      ratePerDay: ['',Validators.compose([ Validators.required,Validators.min(1)])],
    });

    // Restricting the past date
    var dates = new Date();
    var date: any = dates.getDate();
    if(date<10)
    {
      date='0' + date;
    }
    var month: any = dates.getMonth()+1;
    if(month<10)
    {
      month='0' + month;
    }

    var year = dates.getFullYear();
    this.minDate=year+"-"+month+"-"+date;  
    
    

    this.adminId=sessionStorage.getItem('adminId') as string;
    
    this.hotelId = this.router.snapshot.paramMap.get('id') as string;
    console.log(this.hotelId);

    if(this.adminId)
    {
      this.getHotelRooms(parseInt(this.hotelId));
    }
  }

  reloadData(){
    this.service.getAllRooms()
    .subscribe(
      data => { console.log(data); this.rooms=data;  },
      error => { console.log(error);  alert(error);}
    );
  }

  onSearch():void
  {
    var date1 = new Date(this.dates.bookFrom);
    var date2 = new Date(this.dates.bookTo);
 
    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24);           //(milliseconds*min*seconds*hour)

    
    if(Days>=0)
    {
      this.update=false;
      this.details=false;
      // this.searchStatus=false;
      this.hotelRoom=true;

      this.service.getAvailableRooms(this.dates.bookFrom,this.dates.bookTo,parseInt(this.hotelId)).subscribe
      (
        data => {console.log(data); this.roomsAvailable=data;},
        error => {console.log(error); alert(error)}
      );
    }
    else
    {
      alert("Provide proper date for room search..");
    }
  }
  
  remove(roomId:number):void
  {
    this.service.removeRoomById(roomId)
    .subscribe(
      data => { console.log(data); 
       
        this.room = data ;
        this.reloadData();
        console.log(this.rooms);
        this.getHotelRooms(this.room.hotelId);
      },
      error => { console.log(error);  alert(error);}
    );
  }
  editRoom(){
    this.Submitted=true;
    if (this.addForm.invalid) 
    {
      return;  
    }
    else
    {
      this.service.editRoom(this.room)
      .subscribe(
        data => { console.log(data);  this.room1=data;  this.getHotelRooms(parseInt(this.hotelId));},
        error => { console.log(error);  }
      );
    }
    
  }


  detail(roomId:number):void{
    this.update=true;
    this.details=false;
    this.searchStatus=false;
    this.hotelRoom=false;
    this.service.getRoom(roomId)
      .subscribe(
        data => { console.log(data); this.room=data; },
        error => { console.log(error);  alert(error);}
      );
     
  }

  getHotelRooms(hotelId:number):void{
    this.details=true;
    this.update=false;
    this.searchStatus=true;
    this.hotelRoom=false;
    console.log(hotelId);
    this.service.getRoomByHotelId(hotelId)
      .subscribe(
        data => { console.log(data); this.room1=data; },
        error => { console.log(error);  alert(error);}
      );
     
  }

  
}
