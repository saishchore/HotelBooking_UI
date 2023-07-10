import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/PojoClasses/Hotel';
import { HotelserviceService } from 'src/app/Service/Hotel/hotelservice.service';

@Component({
  selector: 'app-createhotel',
  templateUrl: './createhotel.component.html',
  styleUrls: ['./createhotel.component.css']
})
export class CreatehotelComponent implements OnInit {

  hotel : Hotel = new Hotel();
  hotels!: Observable<Hotel[]>;
  addForm!: FormGroup;
  Submitted: boolean=false;

  userId!:number;

  constructor(private service :HotelserviceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userId=parseInt(sessionStorage.getItem('userId') as string);
    // if(!(this.userId))
    // {
    //   this.router.navigate(['/login']);
    // } 

    this.addForm = this.formBuilder.group({
      name: ['',Validators.compose([ Validators.required,Validators.minLength(3), Validators.maxLength(20)])],
      city: ['', Validators.compose([ Validators.required,Validators.minLength(4), Validators.maxLength(20)])],
      address: ['',Validators.compose([ Validators.required,Validators.minLength(5), Validators.maxLength(25)])],
      description: ['', Validators.compose([ Validators.required,Validators.minLength(5), Validators.maxLength(150)])],
      avgRatePerDay: ['', Validators.compose([ Validators.required,Validators.min(1)])],
      email: ['',  Validators.compose([Validators.required, Validators.email])],
      phone1: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      phone2: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      website: ['', Validators.compose([Validators.required,Validators.pattern('(www)\\.[a-zA-Z0-9@:%._+~#?&//=]{2,256}\\.[a-z]{2,6}')])],
      image: ['', Validators.compose([ Validators.required,Validators.min(1)])]
    });
  }
  savehotel(){
  
    this.service.createhotel(this.hotel)
     .subscribe(
       data => { console.log(data); this.router.navigate(['viewhotel'])},
       error => { console.log(error);  alert(error);}
     );
  }

  onSubmit(){
    this.Submitted=true;
    if (this.addForm.invalid)
     {
      return; 
     }
    else
    {
      this.savehotel();
      console.log(this.addForm.value);
    }
 }

  }

