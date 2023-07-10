import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  adminName:string='';
  adminId!:number;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.adminName=sessionStorage.getItem('adminName') as string;
    this.adminId=parseInt(sessionStorage.getItem('adminId') as string);
    if(this.adminId==null || this.adminName==null)
    {
      this.router.navigate(['/admin']);
    }
  }

}
