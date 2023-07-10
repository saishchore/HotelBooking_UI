import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataserviceService } from '../../Service/UserService/dataservice.service';
import { Users } from '../../PojoClasses/Users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  users!: Users[];
  user:Users=new Users();
  userId:string='';
  addForm!: FormGroup;
  Submitted:boolean=false;
  search:string='';

  allUser:boolean=true;
  show:boolean=false;
  update:boolean=false;
  constructor(private service:DataserviceService,private formBuilder: FormBuilder) { }

  ngOnInit(): void 
  {
    this.addForm = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,20}$')])],
      mobile: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      address: ['', Validators.compose([Validators.required,Validators.maxLength(25),Validators.minLength(5)])],
      terms: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      
    },
    
    {
      validators: PasswordChecker('password','confirmPassword'),

    }
   
    );
    this.userId=sessionStorage.getItem('userId') as string;
    if(!(this.show==true))
    {
      this.reloadData();
    }
    
  }
  reloadData() 
  {
    this.service.getUserList()
    .subscribe(
      data => { console.log(data); 
       
        this.users = data ;
        console.log(this.users);
      },
      error => { console.log(error);  alert(error);}
    );
    console.log(this.users);
  }

   detail(userId:number):void
   {
     this.allUser=false;
      this.show=true;
      this.update=false;
      
      this.service.getUser(userId)
      .subscribe(
        data => { console.log(data); this.user=data; },
        error => { console.log(error);  alert(error);}
      );
     
   }

   updateButton(userId:number):void
   {
    
    this.allUser=false;
    this.update=true;
    this.show=false;
    this.service.getUser(userId)
      .subscribe(
        data => { console.log(data); this.user=data; },
        error => { console.log(error);  alert(error);}
      );
     
   }

  remove(userId:number):void
  {
    this.service.removeUserById(userId)
    .subscribe(
      data => { console.log(data); 
       
        this.users = data ;
        this.reloadData();
        console.log(this.users);
      },
      error => { console.log(error);  alert(error);}
    );
  }

  edituser()
  {
    
    this.Submitted=true;
     this.service.editUser(this.user)
      .subscribe(
        data => { console.log(data); this.reloadData()},
        error => { console.log(error);  alert(error);}
      );
  }
  goBack():void
 {
   this.allUser=true;
   this.update=false;
   this.show=false;
 }

}
function PasswordChecker (
  controlName: string,
  ComparecontrolName: string,
  ){
      return (formGroup: FormGroup) => {
          const password = formGroup.controls[controlName];
          const ConfPassword = formGroup.controls[ComparecontrolName];

          if(password.value !== ConfPassword.value){
              ConfPassword.setErrors({mustmatch: true})

          }
          else {
              ConfPassword.setErrors(null);
          }
      }
  }


