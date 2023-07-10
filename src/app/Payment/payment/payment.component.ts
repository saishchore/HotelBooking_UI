import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/PojoClasses/booking';
import { Payment } from 'src/app/PojoClasses/Payment';
import { PaymentService } from 'src/app/Service/Payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  bookingId:string='';
  amount:number=0;
  payment: Payment = new Payment();
  paymentDetails: Payment = new Payment();
  booking: Booking = new Booking();
  add:boolean=true;
  details:boolean=false;
  bookingStatus:boolean=false;
  constructor(private router: ActivatedRoute,private service: PaymentService) { }

  ngOnInit(): void {
    this.add=true;
   this.bookingId=this.router.snapshot.paramMap.get('id') as string;
   this.amount=parseInt(this.router.snapshot.paramMap.get('amount') as string);
    console.log(this.bookingId);
    console.log(this.amount);
  }

  addPayment(): void{
    
    this.payment.bookingId=parseInt(this.bookingId);
    this.payment.amount=this.amount;
    this.service.addPayment(this.payment).subscribe(
      data =>{console.log(data); this.paymentDetails=data; this.details=true; this.add=false;},
      error =>{console.log(error); alert(error);}
    );
  }
  
  checkBooking(bookingId:number): void
  {
    this.bookingStatus=true;
    this.service.getBookingDetailsOnId(bookingId).subscribe(
      data => {console.log(data); this.booking=data;},
      error => {console.log(error); alert(error)}
      );
  }
}
