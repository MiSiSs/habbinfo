import { Friend } from './../_model/friends';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Profile } from '../_model/profile';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url: string = `${HOST}/users`;
  
  httpOptions

  constructor(private http: HttpClient) { }

  name_profile(name: string){
     return this.http.get<Profile>(this.url+`?name=`+name);

     
  }

  friend_profile(uniquieID: string){
    return this.http.get<Friend[]>(this.url+`/`+uniquieID+`/friends`);
  }


}
