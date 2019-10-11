import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminComponent} from './admin/admin.component';
import {MentorComponent} from './mentor/mentor.component';
import {UserComponent} from './user/user.component';
import {RouterModule, Routes} from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserTrainingsComponent } from './user-trainings/user-trainings.component';
import {HttpClientModule} from '@angular/common/http';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {SearchService} from './service/search.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes:Routes = [  // added new  
  {path:'', redirectTo:'menu', pathMatch:'full'}, 
  {path:'mentor', component:MentorComponent}, 
  {path:'admin', component:AdminComponent}, 
  {path:'user', component:UserComponent}, 
  {path:'menu', component:MenuComponent}, 
  {path:'search-result/:keyword/:from/:till',component: SearchResultComponent},
  {path:'user-trainings',component:UserTrainingsComponent},
  {path:'payment-gateway',component:PaymentGatewayComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'**', redirectTo:'menu'} 

];

@NgModule({
  declarations: [
    AppComponent,
    MentorComponent,
    AdminComponent,
    UserComponent,
    MenuComponent,
    SearchResultComponent,
    UserTrainingsComponent,
    PaymentGatewayComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

