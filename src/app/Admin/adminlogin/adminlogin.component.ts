import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Service/Admin/admin.service';
import { Admin } from '../../PojoClasses/Admin';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  alogin:Admin=new Admin();
  addForm!: FormGroup;
  Submitted: boolean=false;
  adminStatus:boolean=false;
  constructor(private service:AdminService,private router:Router,private formBuilder: FormBuilder) { }

   ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      adminName: ['', Validators.required],
      password: ['', Validators.required]
      
    });
  }

  login():void{

    this.Submitted=true;
    if (this.addForm.invalid) {
      return;  }
    else{
    this.service.adminLogin(this.alogin.adminName,this.alogin.password)
      .subscribe(
        data => { console.log(data);  
      this.alogin=data;
      sessionStorage.setItem('adminName',this.alogin.adminName);
      sessionStorage.setItem('adminId',this.alogin.adminId+'');
      this.router.navigate(['/adminhome']);
      },
        error => { console.log(error);  alert(error);}
      );
    }
    
  }

}
