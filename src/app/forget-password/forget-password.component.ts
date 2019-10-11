import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private formBuild:FormBuilder,private service: SearchService) { }
  ForgetPassword:FormGroup;

  ngOnInit() {
    this.ForgetPassword=this.formBuild.group({
      username:['',Validators.required]
    })
  }

  forget(){
    this.service.forgetPassword(this.ForgetPassword.value).subscribe(result => {
      if(result){
        console.log(result);
      }
    })
  }

}
