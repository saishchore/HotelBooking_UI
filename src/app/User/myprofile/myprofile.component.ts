import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Booking } from 'src/app/PojoClasses/booking';
import { Users } from 'src/app/PojoClasses/Users';
import { BookingserviceService } from 'src/app/Service/Booking/bookingservice.service';
import { DataserviceService } from 'src/app/Service/UserService/dataservice.service';
import { UserhomeComponent } from '../userhome/userhome.component';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  bookingsByUser!:Booking[];
  user:Users=new Users();
  
  userName:string='';
  mobile:string='';
  address:string='';
  email:string='';
  userId: string='';
  bookingdetail:boolean=false;
  addForm: any;
  Submitted: boolean=false;
  update:boolean=false;
  curDate!:Date;
  delbooking: Booking=new Booking();
  constructor(private service:BookingserviceService,private userservice:DataserviceService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

      this.userName=sessionStorage.getItem('userName') as string;
      this.userId=sessionStorage.getItem('userId') as string;
      this.email=sessionStorage.getItem('email') as string;
      this.mobile=sessionStorage.getItem('mobile') as string;
      this.address=sessionStorage.getItem('address') as string;


      this.addForm = this.formBuilder.group({
      // userName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      mobile: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      address: ['', Validators.compose([Validators.required,Validators.maxLength(25),Validators.minLength(5)])]
      });

      this.curDate=new Date();

  }

  goback():void{
    this.bookingdetail=false;
    this.update=false;

  }


  getBookingByUserId():void
  {
    this.bookingdetail=true;
    this.update=false;
        this.service.getBookingByUserId(parseInt(this.userId)).subscribe(
        data => 
        {
          console.log(data);
          this.bookingsByUser=data;
        },
        error => { console.log(error); alert(error);}
      )
  }

  updateButton():void
   {
    
    this.update=true;
    this.bookingdetail=false;
    this.userservice.getUser(parseInt(this.userId))
      .subscribe(
        data => { console.log(data); this.user=data; },
        error => { console.log(error);  alert(error);}
      );
     
   }

  edituser()
  {
    this.update=true;
    
    this.Submitted=true;
     this.userservice.editUser(this.user)
      .subscribe(
        data => { console.log(data); this.email=data.email;this.mobile=data.mobile;this.address=data.address;}, 
        error => { console.log(error);  alert(error);}
      );
  }

  removeBooking(bookingId:number):void
   {
      this.service.removeBookingById(bookingId)
      .subscribe(
        data => 
        { 
          console.log(data); 
          this.delbooking = data ;
          // this.reloadData();
          console.log(this.delbooking);
          this.getBookingByUserId();
        },
        error => { console.log(error);  alert(error);});
  }
  
  cancelButton(bookFrom:Date,bookingId:number)
  {
     
          console.log(this.curDate);
          var date2 = new Date(bookFrom);
          var Time = date2.getTime() - this.curDate.getTime();
          var Days = Time / (1000 * 3600 * 24);                            //(milliseconds*min*seconds*hour)
          if(Days>0)
          {
           this.removeBooking(bookingId); 
          }
          else{
            alert("YOU CAN NOT CANCEL EXPIRED BOOKING");
          }
  }

}
