import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/PojoClasses/booking';
import { BookingserviceService } from 'src/app/Service/Booking/bookingservice.service';



@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  bookings!: Booking[];
  bookingsbyhotel!: Booking[];
  booking:Booking=new Booking();
    
  addForm!: FormGroup;
  Submitted: boolean=false;
  
  id:string='';
  detail:boolean=false;
  edit:boolean=false;
  hotelId:string='';
  search:string='';
  
  constructor(private service:BookingserviceService,private route:Router,private formBuilder:FormBuilder,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=sessionStorage.getItem('userId') as string;
    // if(this.id)
    // {
    //   this.route.navigate(['/login']);
    // }

    this.hotelId = this.router.snapshot.paramMap.get('id') as string;
   
    this.booking.userId=parseInt(this.id);
   
    if(this.hotelId!=null)
    {
      this.getByHotelId(parseInt(this.hotelId));
      
    }
    else{
      this.reloadData();
    }
    
   

    this.addForm = this.formBuilder.group({
      bookingId: [{value: '', disabled: true}],
      bookedFrom: ['', Validators.required],
      bookedTo: ['', Validators.required],
      noOfAdults: ['', Validators.required],
      noOfChildren: ['', Validators.required],
      hotelId: [{value: '', disabled: true}],
      roomId: [{value: '', disabled: true}],
      totalAmount: ['', Validators.required]
     
    });
  }
  reloadData() {
    this.service.getBookingDetails()
    .subscribe(
      data => { console.log(data); this.bookings = data ; console.log(this.bookings);
      },
      error => { console.log(error);  alert(error);}
    );
  }

  bookingDetail(bookingId:number):void{
    this.detail=true;
    this.edit=false;
    this.service.getBookingDetailsOnId(bookingId)
      .subscribe(
        data => { console.log(data); this.booking=data; },
        error => { console.log(error);  alert(error);}
      );
    
  }

  editButton(bookingId:number):void{
    this.edit=true;
    this.detail=false;
    this.service.getBookingDetailsOnId(bookingId)
      .subscribe(
        data => { console.log(data); this.booking=data; },
        error => { console.log(error);  alert(error);}
      );
  
  }

 editBooking(){
   this.Submitted=true;
   if (this.addForm.invalid) 
   {
      return;  
   }
   else
   {
     this.service.editBookingDetails(parseInt(this.id),this.booking)
      .subscribe(
        data => { console.log(data); this.reloadData()},
        error => { console.log(error);  alert(error);});
    }
   }
   removeBooking(bookingId:number):void
   {
      this.service.removeBookingById(bookingId)
      .subscribe(
        data => 
        { 
          console.log(data); 
          this.bookings = data ;
          this.reloadData();
          console.log(this.bookings);
        },
        error => { console.log(error);  alert(error);});
  }

  getByHotelId(hotelId:number):void
  {
        this.service.getBookingByHotelId(hotelId).subscribe(
        data => 
        {
          console.log(data);
          this.bookingsbyhotel=data;
        },
        error => { console.log(error); alert(error);}
      )
  }
   

}
