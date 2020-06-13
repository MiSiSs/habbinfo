import { Badges } from './../_model/badges';
import { Friend } from './../_model/friends';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Profile } from '../_model/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url: string = `${HOST}/users`;
  
  constructor(private http: HttpClient) { }

  name_profile(name: string){
     return this.http.get<Profile>(this.url+`?name=`+name);     
  }

  friend_profile(uniquieID: string){
    return this.http.get<Friend[]>(this.url+`/`+uniquieID+`/friends`);
  }

  badge_name(uniquID: string){
    return this.http.get<Badges[]>(this.url+"/"+uniquID+"/badges");
  }
}
