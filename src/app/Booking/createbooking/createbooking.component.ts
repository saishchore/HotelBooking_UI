import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/PojoClasses/booking';
import { BookingserviceService } from 'src/app/Service/Booking/bookingservice.service';


@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  Submitted:boolean=false;
  bookings!: Booking[];
  booking:Booking=new Booking();
  bookingPayment:Booking=new Booking();
  addBooking:Booking=new Booking();

  addForm!: FormGroup;
  id:string='';
  myDate!:Date;
  public hotelNameList:Array<string>=[];

  hotelId:string='';
  roomId:string='';
  rate:string='';
  checkDate:boolean=false;
  bookFrom:any;
  bookTo:any;

  constructor(private service:BookingserviceService,private formBuilder:FormBuilder,private router: ActivatedRoute,private route:Router) { }

   ngOnInit(): void {
    this.id=sessionStorage.getItem('userId') as string;
    if(this.id==null)
    {
      this.route.navigate(['/login']);
    }
    this.booking.userId=parseInt(this.id);
    console.log(this.booking.userId);
    

    this.addForm = this.formBuilder.group({
      bookedFrom: [{value: '', disabled: true}, Validators.required],
      bookedTo: [{value: '', disabled: true}, Validators.required],
      noOfAdults: ['', Validators.compose([ Validators.required,Validators.min(1), Validators.max(2)])],
      noOfChildren: ['', Validators.compose([ Validators.required,Validators.min(0), Validators.max(2)])],
      totalAmount: [{value: '', disabled: true}, Validators.required]
      
   });
    
    this.router.paramMap.subscribe(params => 
    {
      this.hotelId=params.get('hotelId') as string;
      this.roomId=params.get('roomId') as string;
      this.rate=params.get('rate') as string;
      this.bookFrom=params.get('dateFrom');
      this.bookTo=params.get('dateTo');
      
    });
     
    this.addBooking.totalamount=0;
    
  }

  onSearchChange(searchValue: any): void {  
    console.log(searchValue);
    var date1 = new Date(this.bookFrom);
    var date2 = new Date(this.bookTo);
 
    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24);            //(milliseconds*min*seconds*hour)
    
    if(Days>0)
    {
      this.checkDate=true;
      this.addBooking.totalamount=parseInt(this.rate)*Days;
    }
    else if(Days==0)
    {
      this.checkDate=true;
      this.addBooking.totalamount=parseInt(this.rate);
    }
    else{
      alert("Check your dates for booking..");
    }
    
  }

   reloadData() {
    this.service.getBookingDetails()
    .subscribe(
      data => { console.log(data); 
        this.bookings = data ;
        console.log(this.bookings);
      },
      error => { console.log(error);  alert(error);}
    );
    console.log(this.bookings);
  }

   onSubmitforAdd(){
    this.Submitted=true;
    if (this.addForm.invalid) {
      return;  }
    else{
     
      if(this.checkDate)
      {
        this.saveBooking();
      }
      else
      {
        alert("Check your dates and try again..");
      }
      
      
    }
 }

  saveBooking(){
    this.addBooking.hotelId=parseInt(this.hotelId);
    this.addBooking.roomId=parseInt(this.roomId);
    this.addBooking.bookedFrom=this.bookFrom;
    this.addBooking.bookedTo=this.bookTo;
    
     this.service.createBooking(parseInt(this.id),this.addBooking)
      .subscribe(
        data => { console.log(data); this.bookingPayment=data; this.route.navigate(['/payment',this.bookingPayment.bookingId,this.bookingPayment.totalamount]);},
        error => { console.log(error);  alert(error);}
      );
    
  }

  

  

}
