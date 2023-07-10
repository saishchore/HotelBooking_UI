import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Booking } from 'src/app/PojoClasses/booking';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {
private baseUrl = 'http://localhost:8082/booking/v1';
private baseUrl1 = 'http://localhost:8082/hotel/h1';

constructor(private http: HttpClient) { }

getBookingDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getallbookingdetails`).pipe(catchError(this.handleError));
  }

  getBookingDetailsOnId(bookingId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getbookingdetails/${bookingId}`).pipe(catchError(this.handleError));
  }

  editBookingDetails(userId:number,booking: Booking): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatebookingdetails/${userId}`, booking).pipe(catchError(this.handleError));
  }

  removeBookingById(bookingId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removebookingdetails/${bookingId}`).pipe(catchError(this.handleError));
  }

  createBooking(userId:number,addBooking: Booking): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/addBookingDetails/${userId}/`,addBooking).pipe(catchError(this.handleError));
  }

  getDropdownOfHotel(): Observable<any> {
    return this.http.get(`${this.baseUrl1}/getallhotels`).pipe(catchError(this.handleError));
  }
  
  getBookingByHotelId(hotelId:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getbookingdetailsbyhotelId/${hotelId}`).pipe(catchError(this.handleError));
  }

  getBookingByRoomId(roomId:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getbookingdetailsbyroomId/${roomId}`).pipe(catchError(this.handleError));
  }

  getBookingByUserId(userId:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getbookingdetailsbyuserid/${userId}`);
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
