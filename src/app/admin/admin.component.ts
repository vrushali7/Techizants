import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private formBuild:FormBuilder,private service:SearchService,private route:ActivatedRoute) { }
  TechnologyForm:FormGroup;
  technology:any;
  payment:any;
  users:any;
  mentors:any;
  id:number;
  ngOnInit():void {
//in
    this.TechnologyForm=this.formBuild.group({
      name:['',Validators.required],
      toc:['',Validators.required],
      prerequisites:['',Validators.required],
      fees:['',Validators.required]
    })

   this.getAllTech();
   this.getAllPayments();
   this.getAllUsers();
    this.getByRoleUser();
   
  }
//in
  addTech(){
    this.service.addTech(this.TechnologyForm.value).subscribe(result=>{
      if(result){
        console.log(result);
      }else{
        this.getAllTech();
      }
    })
    // this.router.navigate(['/admin']);
  }
  //out

   getAllTech(){
     this.service.getAllTech().subscribe(result=>{
        if(result){
          this.technology=result;
        }
     })
   }
  
   remove(techid:number){
     this.service.deleteTech(techid).subscribe(result=>{
       if(result){
         console.log(result);
         this.getAllTech();
       }
     })
   }

   getAllPayments(){
     this.service.getAllPayment().subscribe(result=>{
       if(result){
         this.payment=result;
       }
     })
   }

   getAllUsers(){
     this.service.getAllUsers().subscribe(result=>{
       if(result){
         this.users=result;
       }
     })
   }

   deactivate(id:number){
     this.service.deactivate(id).subscribe(result=>{
       if(result){
         console.log(result);
       }else{
        this.getByRoleUser();
       }
     })
   }

   activate(id:number){
    this.service.activate(id).subscribe(result=>{
      if(result){
        console.log(result);
      }else{
        this.getByRoleUser();
      }
    })
  }

   getByRoleUser(){
     this.service.getByRole("user").subscribe(result=>{
       if(result){
         this.users=result;
       }
     })
     this.service.getByRole("mentor").subscribe(result=>{
      if(result){
        this.mentors=result;
      }
    })
   }
   
}
