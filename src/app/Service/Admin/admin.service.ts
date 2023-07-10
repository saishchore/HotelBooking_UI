import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8082/admin/v1';
  constructor(private http: HttpClient,private router: Router) { }


  adminLogin(adminName:string,password:string) : Observable<any>{

    return this.http.get(`${this.baseUrl}/adminlogin/${adminName}/${password}`).pipe(catchError(this.handleError));

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
