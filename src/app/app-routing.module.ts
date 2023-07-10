import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './Admin/adminlogin/adminlogin.component';
import { CreateuserComponent } from './User/createuser/createuser.component';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './User/login/login.component';
import { NavbarComponent } from './Navbar/navbar.component';
import { UserhomeComponent } from './User/userhome/userhome.component';
import { UserlogoutComponent } from './Userlogout/userlogout.component';
import { ViewusersComponent } from './User/viewusers/viewusers.component';
import { BookdetailsComponent } from './Booking/bookdetails/bookdetails.component';
import { CreatebookingComponent } from './Booking/createbooking/createbooking.component';
import { RoomdetailsComponent } from './Room/roomdetails/roomdetails.component';
import { CreateRoomComponent } from './Room/create-room/create-room.component';
import { ViewhotelComponent } from './Hotel/viewhotel/viewhotel.component';
import { CreatehotelComponent } from './Hotel/createhotel/createhotel.component';
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { MyprofileComponent } from './User/myprofile/myprofile.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { HotellistComponent } from './Hotel/hotellist/hotellist.component';
// import { CreateproductComponent } from './createproduct/createproduct.component';
// import { ViewproductComponent } from './viewusers/viewproduct.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'view' , component:ViewusersComponent},
  {path:'create' , component:CreateuserComponent},
  {path:'login' , component:LoginComponent},
  {path:'userhome' , component:UserhomeComponent},
  {path:'logout' , component:UserlogoutComponent},
  {path:'admin' , component:AdminloginComponent},
  {path:'navbar' , component:NavbarComponent},
  {path:'bookingdetails' , component:BookdetailsComponent},
  {path:'addbookingdetails' , component:CreatebookingComponent},
  {path:'viewroom',component:RoomdetailsComponent},
  {path:'createroom/:hotelId',component:CreateRoomComponent},
  {path:'viewhotel',component:ViewhotelComponent},
  {path:'createhotel', component:CreatehotelComponent},
  {path:'adminhome', component:AdminhomeComponent},
  {path:'roomdetails/:id',component:RoomdetailsComponent},
  {path:'bookingdetails/:id' , component:BookdetailsComponent},
  {path:'addbookingdetails/:hotelId/:roomId/:rate/:dateFrom/:dateTo' , component:CreatebookingComponent},
  {path:'myprofile' , component:MyprofileComponent},
  {path:'payment/:id/:amount' , component:PaymentComponent},
  {path:'hotellist' , component:HotellistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
