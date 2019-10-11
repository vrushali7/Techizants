import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../service/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {
  
  constructor(private router:Router,private formBuild:FormBuilder, private service :SearchService) { }
  trainings:any;
  ngOnInit() {
    this.showRequests();
  }
  showRequests(){
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.service.getFeedbackByUserId(currentUser.id).subscribe(result=>{
      if(result){
        console.log(result);
        this.trainings=result;
      }
    })
    
  }
}
