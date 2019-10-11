import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from '../service/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {

  currentUser:any;
  constructor(private router:Router,private formBuild:FormBuilder, private service :SearchService) { }
  UpdateMentorForm:FormGroup;
  showFeedbackForm:FormGroup;
  trainings:any=[];
  trainer:any;
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem('user'));
    this.UpdateMentorForm = this.formBuild.group({
      id:[''],
      username:[''],
      password:[''],
      first_name:[''],
      last_name:[''],
      contact_number:[''],
      reg_code:[''],
      linkedin_url:[''],
      years_of_experience:['']
    })
    this.showFeedbackForm = this.formBuild.group({
      userId:[''],
      userName:[''],
      avgRating:[''],
      feedback:['']
     
    })
    this.getUser();
    this.showRequests();
    // showRequests();
  }
  getUser(){
    this.service.getUser(this.currentUser.id).subscribe(result=>{
      if(result){
        this.UpdateMentorForm.patchValue(result);
        console.log(result);
      }
    })
  }
  updateMentor(){

    this.service.updateMentor(this.UpdateMentorForm.value).subscribe(result=>{

      if(result){
        console.log(result);
        this.getUser();
      }
    })
  }

  showFeedbacks(){
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.service.getFeedbackByMentorId(currentUser.id).subscribe(result=>{
      if(result){
        console.log(result);
        this.trainer = result;
      }
    })
  }
  showRequests(){
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.service.getMentorByMentorId(currentUser.id).subscribe(result=>{
      if(result){
        console.log(result);
        this.trainings=result;
      }
    })
    
  }

  logout(){
    this.service.logout();
    this.router.navigate(['/menu']);
    
  }
}
