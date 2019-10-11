import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import {  ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser:any;
  SearchForm:FormGroup;
  UpdateRateForm:FormGroup;
  keyword=new FormControl;
  from = new FormControl;
  till = new FormControl;
  UpdateForm:FormGroup;
  rating:any;
  constructor(private router:Router,private formBuild:FormBuilder,private service:SearchService, private route:ActivatedRoute) { }
  
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem('user'));

    this.SearchForm=this.formBuild.group({
      keyword: [''],
      from:[''],
      till:['']
    })
    this.UpdateForm = this.formBuild.group({
      id:[''],
      username:[''],
      password:[''],
      first_name:[''],
      last_name:[''],
      contact_number:[''],
      reg_code:[''],
      linkedin_url:['']
      
    })
    this.UpdateRateForm = this.formBuild.group({
      mentorId:[''],
      mentorName:[''],
      skillId:[''],
      skillName:[''],
      toc:[''],
      prerequisites:[''],
      fees:[''],
      status:['']
    })
    this.getUser();
    this.getMentorByUserId();
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/menu']);
    
  }

  search(){
    this.router.navigate(['/search-result',this.keyword.value,this.from.value,this.till.value])
  }
  getUser(){
    this.service.getUser(this.currentUser.id).subscribe(result=>{
      if(result){
        this.UpdateForm.patchValue(result);
        console.log(result);
      }
    })
  }
  update(){

    this.service.updateMentor(this.UpdateForm.value).subscribe(result=>{

      if(result){
        console.log(result);
        this.getUser();
      }
    })
  }

  get f(){
    return this.UpdateRateForm.controls;
  }

  getMentorByUserId(){
    this.service.getMentorByUserId(this.currentUser.id).subscribe(result=>{
      if(result){
        this.UpdateRateForm.patchValue(result);
        console.log(result);
      }
    })
  }

  rateMentor(){
    this.service.rateMentor(this.UpdateRateForm.value).subscribe(result=>{
      if(result){
        console.log(result);
        this.getMentorByUserId();
      }
    })
  }

}
