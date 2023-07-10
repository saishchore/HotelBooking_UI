import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/PojoClasses/Hotel';
import { HotelserviceService } from 'src/app/Service/Hotel/hotelservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewhotel',
  templateUrl: './viewhotel.component.html',
  styleUrls: ['./viewhotel.component.css']
})
export class ViewhotelComponent implements OnInit {

  hotels!:Hotel[];
  hotel: Hotel= new Hotel();
  userId:string='';

  hotelName: string='';
  search: string='';
  edit: boolean=false;
  detail: boolean=false;
  addForm!: FormGroup;
  Submitted: boolean=false;

  constructor(private service:HotelserviceService, private router:Router,private formBuilder: FormBuilder) { }

  adminId:string='';
  allhotels:boolean=true;
  searchstatus:boolean=true;
  hotelId:number=0;

  ngOnInit(): void 
  {

    this.addForm = this.formBuilder.group({
      name: ['',Validators.compose([ Validators.required,Validators.minLength(3), Validators.maxLength(20)])],
      city: ['', Validators.compose([ Validators.required,Validators.minLength(4), Validators.maxLength(20)])],
      address: ['',Validators.compose([ Validators.required,Validators.minLength(5), Validators.maxLength(25)])],
      description: ['', Validators.compose([ Validators.required,Validators.minLength(5), Validators.maxLength(150)])],
      avgRatePerDay: ['', Validators.compose([ Validators.required,Validators.min(1)])],
      email: ['',  Validators.compose([Validators.required, Validators.email])],
      phone1: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      phone2: ['', Validators.compose([Validators.required,Validators.pattern('^(0/91)?[7-9][0-9]{9}$')])],
      website: ['', Validators.compose([Validators.required,Validators.pattern('(www)\\.[a-zA-Z0-9@:%._+~#?&//=]{2,256}\\.[a-z]{2,6}')])]
    });
    if(!(this.detail==true))
    {this.reloadData();}
    
    if(sessionStorage.getItem('adminId')!=null)
     {
        this.adminId=sessionStorage.getItem('adminId') as string;
     }
     this.userId=sessionStorage.getItem('userId') as string;
    //  if(!(this.userId))
    //  {
    //   this.router.navigate(['/login']);
    //  }
    
  }
  reloadData() {
     this.service.getAllHotels()
      .subscribe(
        data => { console.log(data); this.hotels=data;  },
        error => { console.log(error);  alert(error);}
      );
  }

  checkRoom():void
  {
    if(this.userId)
    {
      this.router.navigate(['/roomdetails',this.hotelId]);
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  detailbutton(hotelId:number):void{
    this.allhotels=false;
    this.detail=true;
    this.edit=false;
    this.service.getHotel(hotelId)
      .subscribe(
        data => { console.log(data); this.hotel=data; this.hotelId=this.hotel.hotelId; },
        error => { console.log(error);  alert(error);}
      );
     
  }  

  updatebutton(hotelId:number):void{
    this.edit=true;
    this.detail=false;
    this.allhotels=false;
    this.searchstatus=false;
    this.service.getHotel(hotelId)
      .subscribe(
        data => { console.log(data); this.hotel=data; },
        error => { console.log(error);  alert(error);}
      );
     
  }

  remove(hotelId:number):void
  {
    this.service.removeHotelById(hotelId)
    .subscribe(
      data => { console.log(data); this.hotel = data ; this.reloadData(); console.log(this.hotels);},
      error => { console.log(error);  alert(error);}
    );
  }

  edithotel(){
    this.service.editHotel(this.hotel)
      .subscribe(
        data => { console.log(data); this.reloadData(); this.allhotels=true; this.searchstatus=true; this.edit=false;},
        error => { console.log(error);  }
      );
  }
 
  searchhotel(hotelName: string){
    this.service.searchHotel(hotelName);
  }

  onSubmit(){
    this.Submitted=true;
    if (this.addForm.invalid)
     {
      return; 
     }
    else
    {
      this.edithotel();
      console.log(this.addForm.value);
    }
 }

 goBack():void
 {
   this.allhotels=true;
   this.detail=false;
   this.edit=false;
 }
 
  
}
