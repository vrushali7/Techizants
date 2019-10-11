import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../service/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(private router:Router,private formBuild:FormBuilder, private service :SearchService) { }
  trainings:any;
  ngOnInit() {
    this.showRequests();
  }
  showRequests(){
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.service.getMentorByUserId(currentUser.id).subscribe(result=>{
      if(result){
        console.log(result);
        this.trainings=result;
      }
    })
    
  }
}
