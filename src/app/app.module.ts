import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HelpComponent } from './help/help.component';
import { DataserviceService } from './Service/UserService/dataservice.service';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ViewusersComponent } from './User/viewusers/viewusers.component';

import { LoginComponent } from './User/login/login.component';
import { UserhomeComponent } from './User/userhome/userhome.component';
import { UserlogoutComponent } from './Userlogout/userlogout.component';
import { HomeComponent } from './Home/home.component';
import { AdminloginComponent } from './Admin/adminlogin/adminlogin.component';
import { NavbarComponent } from './Navbar/navbar.component';
import { ConfirmedvalidatorDirective } from './confirmedvalidator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateuserComponent } from './User/createuser/createuser.component';
import { CreatehotelComponent } from './Hotel/createhotel/createhotel.component';
import { ViewhotelComponent } from './Hotel/viewhotel/viewhotel.component';
import {  Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateRoomComponent } from './Room/create-room/create-room.component';
import { RoomdetailsComponent } from './Room/roomdetails/roomdetails.component';
import { BookdetailsComponent } from './Booking/bookdetails/bookdetails.component';
import { CreatebookingComponent } from './Booking/createbooking/createbooking.component';
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { MyprofileComponent } from './User/myprofile/myprofile.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { HotellistComponent } from './Hotel/hotellist/hotellist.component';
// import { ViewproductComponent } from './viewusers/viewproduct.component';
// import { CreateproductComponent } from './createproduct/createproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewusersComponent,
    CreateuserComponent,
    LoginComponent,
    UserhomeComponent,
    UserlogoutComponent,
    HomeComponent,
    AdminloginComponent,
    NavbarComponent,
    ConfirmedvalidatorDirective,
    CreatehotelComponent,
    ViewhotelComponent,
    CreateRoomComponent,
    RoomdetailsComponent,
    BookdetailsComponent,
    CreatebookingComponent,
    AdminhomeComponent,
    MyprofileComponent,
    PaymentComponent,
    HotellistComponent
    
     // ViewproductComponent,
    // CreateproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [DataserviceService,FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
