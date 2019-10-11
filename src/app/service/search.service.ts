import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Search } from '../model/search';
import { Observable } from 'rxjs';
import { Time, JsonPipe } from '@angular/common';
import {map} from 'rxjs/operators';


type EntityResponseType = HttpResponse<Search[]>;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  getAllTrainersSpringBoot(keyword:String,from:String,till:String){
    return this.http.get("http://localhost:8777/api/search/trainer/"+keyword+"/"+from+"/"+till);}
  
  save(search:Search){
    return this.http.post<Search>("http://localhost:8777/api/search/trainer",search);
  }

  addUser(User:any){
    return this.http.post("http://localhost:8777/api/security/register",User);
  }

  forgetPassword(User:any){
    return this.http.post("http://localhost:8994/forget-password",User);
  }

  authenticate(User:any){
    return this.http.post<any>("http://localhost:8994/authenticate",User).pipe(map(res=>{
      console.log(res);
      if(res){
        localStorage.setItem('user',JSON.stringify(res.user));
        localStorage.setItem('TOKEN',JSON.stringify(res.jwttoken));
      }
    }));
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('TOKEN');
  }

  addMentor(Mentor:any){
    return this.http.post("http://localhost:8994/register",Mentor);
  }

  addTech(Tech:any){
    return this.http.post("http://localhost:8098/technology",Tech);
  }

  deleteTech(techid:number){
    return this.http.delete("http://localhost:8098/technology/"+techid);
  }

  getAllTech(){
    return this.http.get("http://localhost:8098/technology");
  }

  getAllPayment(){
    return this.http.get("http://localhost:8097/payment");
  }

  deactivate(id:number){
    return this.http.put("http://localhost:8095/Deactivate/"+id,[]);
  }

  activate(id:number){
    return this.http.put("http://localhost:8095/Activate/"+id,[]);
  }

  getAllUsers()
{
  return this.http.get("http://localhost:8095/Users");
}

getByRole(role:String){
  return this.http.get("http://localhost:8095/User/"+role);
}
getUser(id:number){
  return this.http.get("http://localhost:8095/UsersById/"+id);
}
//
updateMentor(user:any){

  return this.http.put("http://localhost:8095/User",user);
}
//
showRequests(mentorId:number){
  return this.http.get("http://localhost:8096/trainingByMentor/"+mentorId);
}

getMentorByUserId(userId:number){
  return this.http.get("http://localhost:8096/trainingByUser/"+userId);
}

getMentorByMentorId(mentorId:number){
  return this.http.get("http://localhost:8096/trainingByMentor1/"+mentorId);
}

getFeedbackByMentorId(mentorId:number){
  return this.http.get("http://localhost:8096/trainingByMentor2/"+mentorId);
}
getFeedbackByUserId(userId:number){
  return this.http.get("http://localhost:8096/trainingByUser1/"+userId);
}

rateMentor(mentor:any){
  return this.http.put("http://localhost:8095/User",mentor);
}

addRequest(request:any){
  return this.http.post("http://localhost:8096/addRequest",request);
}
}


