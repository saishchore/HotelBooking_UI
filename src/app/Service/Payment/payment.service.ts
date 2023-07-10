import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Payment } from 'src/app/PojoClasses/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8082/payment/v1';
  private baseUrl1 = 'http://localhost:8082/booking/v1';
  constructor(private http: HttpClient) { }

  addPayment(payment: Payment): Observable<any> {
    return this.http.post(`${this.baseUrl}/addPayment`, payment).pipe(catchError(this.handleError));
  }

  getBookingDetailsOnId(bookingId: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/getbookingdetails/${bookingId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    if(error.error.message){
        console.error('Client Side Error: ' , error.error.message);
        return throwError(error.error.message);
    }else{
      console.error('Server Side Error: ', error);
      return throwError("Server is Down");
    }
    
  }

}
