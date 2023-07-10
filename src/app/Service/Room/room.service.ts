import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Room } from 'src/app/PojoClasses/Room';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService 
{
 private baseUrl = 'http://localhost:8082/room/v1';
 private baseUrl1 = 'http://localhost:8082/booking/v1';
 message:string='';
  constructor(private http: HttpClient) { }
 
  getAllRooms(): Observable<any>{
    return this.http.get(`${this.baseUrl}/getallroomdetails`).pipe(catchError(this.handleError));
  }
  
  removeRoomById(roomId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeroom/`+roomId).pipe(catchError(this.handleError));
  }
  createRoom(room: Room): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRoom`, room).pipe(catchError(this.handleError));
  }
  editRoom(room: Room): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateroom`, room).pipe(catchError(this.handleError));
  }
  getRoom(roomId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getroombyid/${roomId}`).pipe(catchError(this.handleError));
  }

  getRoomByHotelId(hotelId: number): Observable<any> 
  {
    return this.http.get(`${this.baseUrl}/getbyhotelid/${hotelId}`).pipe(catchError(this.handleError));
  }

  getAvailableRooms(bookFrom: Date, bookTo: Date, hotelId:number): Observable<any>
  {
    return this.http.get(`${this.baseUrl1}/getroomids/${bookFrom}/${bookTo}/${hotelId}`).pipe(catchError(this.handleError));
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



