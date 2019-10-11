import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {SearchService} from '../service/search.service';
import {first} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,private formBuild:FormBuilder, private service :SearchService,
    private toastr: ToastrService) { }
  SearchForm:FormGroup;
  RegisterForm: FormGroup;
  RegisterMentorForm:FormGroup;
  AuthenticateForm:FormGroup;
  keyword=new FormControl;
  from = new FormControl;
  till = new FormControl;
  username = new FormControl;
  password = new FormControl;
  years_of_experience = new FormControl;

  ngOnInit() {
    this.SearchForm=this.formBuild.group({
      keyword: [''],
      from:[''],
      till:['']
    })
    this.RegisterForm=this.formBuild.group({
      username:['',Validators.required],
      password:['',Validators.required],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      contact_number:['',Validators.required],
      reg_code:[''],
      linkedin_url:[''],
      role:['user']
    })

    this.RegisterMentorForm = this.formBuild.group({
      username:['',Validators.required],
      password:['',Validators.required],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      contact_number:['',Validators.required],
      reg_code:[''],
      linkedin_url:[''],
      years_of_experience:[''],
      role:['mentor']
    })

    this.AuthenticateForm=this.formBuild.group({
      username:['',Validators.required],
      password:['',Validators.required]
      
    })
  }
  search(){
    this.router.navigate(['/search-result',this.keyword.value,this.from.value,this.till.value])
  }
 
  register(){
    this.service.addUser(this.RegisterForm.value).subscribe(result => {
      if(result){
        this.toastr.success("Success","Registration Successful");
        console.log(result);
        this.router.navigate(['/menu']);
      }
    },
    error => {
      this.toastr.error("Failure","Registration Failed!");
    }
    )
  }

  registerMentor(){
    this.service.addMentor(this.RegisterMentorForm.value).subscribe(result=>{
      if(result){
        console.log(result);
        this.router.navigate(['/menu']);
      }
    })
  }

  authenticate(){
    this.service.authenticate(this.AuthenticateForm.value).pipe(first()).subscribe(data =>{
      if(JSON.parse(localStorage.getItem('user')).role=='mentor'){
        this.router.navigate(['/mentor']);
      }else if(JSON.parse(localStorage.getItem('user')).role=='admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/user']);
      }
        this.toastr.success("Success","Login Successful");
    })
  }

  authenticateMentor(){
    this.service.authenticate(this.AuthenticateForm.value).subscribe(data=>{
   console.log(JSON.parse(localStorage.getItem('user')).role );
      
    })
  }

  authenticateAdmin(){
    this.service.authenticate(this.AuthenticateForm.value).pipe(first()).subscribe(data=>{
      this.router.navigate(['/admin']);
    })
  }
}
