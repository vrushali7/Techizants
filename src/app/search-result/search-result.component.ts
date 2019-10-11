import { Component, OnInit } from '@angular/core';
import { Search } from '../model/search';
import { SearchService } from '../service/search.service';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
import { FormBuilder, FormControl,FormGroup} from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
 
  search:any;
  AddRequestForm:FormGroup;
keyword:string;
from:any;
till:any;

  constructor(private router:Router,private formBuild:FormBuilder, private service :SearchService,private route:ActivatedRoute) { }
  ngOnInit():void {
    // this.trainers = this.usersDataService.getAllTrainers().subscribe((data)=>{
    //   this.trainers = data;
    // });
    // this.trainers = this.usersDataService.getAllTrainers(); 
    this.route.paramMap.subscribe(params => {
      this.keyword = params.get('keyword');
      this.from = params.get('from');
      this.till = params.get('till');
   
    this.service.getAllTrainersSpringBoot(this.keyword,this.from,this.till).subscribe(data => {
      this.search = data;
      console.log(this.search);
    });
  });
  
  }

  request(search){
    this.AddRequestForm = this.formBuild.group({
    userId:[''],
    userName:[''],
    mentorId:[''],
    mentorName:[''],
    skillId:[''],
    skillName:[''],
    RequestDate:[''],
    status:['request']
  }) 

    this.service.addRequest(this.AddRequestForm.value).subscribe(result=>{
      if(result){
        console.log(result);
      }
    })
  }
 
}
