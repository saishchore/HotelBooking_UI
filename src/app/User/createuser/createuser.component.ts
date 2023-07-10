import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DataserviceService } from '../../Service/UserService/dataservice.service';
import { Users } from '../../PojoClasses/Users';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  users!: Observable<Users[]>;
  user:Users=new Users();
  addForm!: FormGroup;
  Submitted!: boolean;
  
  constructor(private service:DataserviceService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,20}$')])],
      mobile: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      address: ['', Validators.compose([Validators.required,Validators.maxLength(25),Validators.minLength(5)])],
      terms: ['', Validators.required],
      confirmPassword: ['',Validators.required]
    },
    {
      validators: this.PasswordChecker('password','confirmPassword'),

    } );
  }

  saveuser()
  {
    this.Submitted=true;
    if (this.addForm.invalid) 
    {
      return;  
    }
    else{
    this.user.role='Customer';
     this.service.createUser(this.user)
      .subscribe(
        data => { console.log(data); this.router.navigate(['/login'])},
        error => { console.log(error);  alert(error);}
      );
    }
  }

  PasswordChecker (
    controlName: string,
    ComparecontrolName: string,
    ){
        return (formGroup: FormGroup) => {
            const password = formGroup.controls[controlName];
            const confirmPassword = formGroup.controls[ComparecontrolName];
            if (confirmPassword.errors && !confirmPassword.errors.mustmatch) {
              // return if another validator has already found an error on the matchingControl
              return ;
          }
   
            if(password.value !== confirmPassword.value){
                confirmPassword.setErrors({mustmatch: true})
   
            }
            else {
                confirmPassword.setErrors(null);
            }
        }
    }
}



