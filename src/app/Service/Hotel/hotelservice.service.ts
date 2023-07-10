import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import { Hotel } from 'src/app/PojoClasses/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelserviceService {

  private baseUrl = 'http://localhost:8082/hotel/h1' ;

  constructor(private http: HttpClient) { 

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
  
  getAllHotels(): Observable<any>{
    return this.http.get(`${this.baseUrl}/getallhotels`).pipe(catchError(this.handleError));
 }
 getHotel(hotelId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/gethotelbyid/${hotelId}`);
}

createhotel(hotel: Hotel): Observable<any> {
  return this.http.post(`${this.baseUrl}/addHotel`, hotel).pipe(catchError(this.handleError));
}

removeHotelById(hotelId:number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/removehotel/`+hotelId).pipe(catchError(this.handleError));
}

editHotel(hotel: Hotel): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateHotel`, hotel).pipe(catchError(this.handleError));
}

searchHotel(hotelName: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/gethotelbyname/` +hotelName).pipe(catchError(this.handleError));
}
}
