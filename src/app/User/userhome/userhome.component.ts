import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../../Service/UserService/dataservice.service';
import { Users } from '../../PojoClasses/Users';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  userId:string='';
  userName:string='';
  user:Users=new Users;
  constructor(private service:DataserviceService,private route:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')!=null)
    {
      this.userId=sessionStorage.getItem('userId') as string;
      this.userName=sessionStorage.getItem('userName') as string;
      this.service.getUserById(this.userId)
        .subscribe(
          data => { console.log(data); 
          this.user=data;
      
      },
        error => { console.log(error);  alert(error);}
      );
    }
    else{
      this.route.navigate(['/login']);

    }


  }

}
