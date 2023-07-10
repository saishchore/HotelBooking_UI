import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';
import { Users } from '../../PojoClasses/Users';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private baseUrl = 'http://localhost:8082/user/v1';
  private baseUrl1 = 'http://localhost:8082/admin/v1';
  constructor(private http: HttpClient,private router: Router) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getallusers`).pipe(catchError(this.handleError));
  }

  removeUserById(userId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeuser/`+userId).pipe(catchError(this.handleError));
  }

  createUser(user: Users): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/addUser/`, user).pipe(catchError(this.handleError));
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getuserbyid/${userId}`).pipe(catchError(this.handleError));
  }

   editUser(user: Users): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateuser/`, user).pipe(catchError(this.handleError));
  }

  userLogin(userName:string,password:string) : Observable<any>{

    return this.http.get(`${this.baseUrl}/userlogin/${userName}/${password}`).pipe(catchError(this.handleError));

  }

  getUserById(userId:any) : Observable<any>{

    return this.http.get(`${this.baseUrl}/getuserbyid/${userId}`).pipe(catchError(this.handleError));

  }

  adminLogin(adminName:string,password:string) : Observable<any>{

    return this.http.get(`${this.baseUrl1}/adminlogin/${adminName}/${password}`).pipe(catchError(this.handleError));

  }

  logout()
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);
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