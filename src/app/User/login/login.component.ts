import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataserviceService } from '../../Service/UserService/dataservice.service';
import { Users } from '../../PojoClasses/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users!: Observable<Users[]>;
  user:Users=new Users();
  addForm!: FormGroup;
  Submitted!: boolean;
  constructor(private service:DataserviceService, private router:Router, private formBuilder: FormBuilder,private location: Location) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
      
    });
    
  }
  login():void{
    this.Submitted=true;
    if (this.addForm.invalid) 
    {
      return;  
    }
    else{
      this.user.role='Customer';
      this.service.userLogin(this.user.userName,this.user.password)
        .subscribe(
          data => { console.log(data);  
              this.user=data;
              sessionStorage.setItem('userName',this.user.userName);
              sessionStorage.setItem('userId',this.user.userId+'');
              sessionStorage.setItem('email',this.user.email);
              sessionStorage.setItem('mobile',this.user.mobile);
              sessionStorage.setItem('address',this.user.address);
              this.router.navigate(['']);
              
              },
              error => { console.log(error);  alert(error);}
            );
      }
    
    }

  }


