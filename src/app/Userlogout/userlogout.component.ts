import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userlogout',
  templateUrl: './userlogout.component.html',
  styleUrls: ['./userlogout.component.css']
})
export class UserlogoutComponent implements OnInit {
  userId:string='';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userId') as string;
    if(this.userId)
    {
    sessionStorage.clear();
    
    this.router.navigate(['/login']);
    }
    else
    {
      sessionStorage.clear();
    
      this.router.navigate(['']);
    }
}
  

}
