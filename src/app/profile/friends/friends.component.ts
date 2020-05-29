import { ProfileService } from './../../_service/profile.service';
import { Profile } from './../../_model/profile';
import { Friend } from './../../_model/friends';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Profile[], private profileService: ProfileService) { }

  profile_origen: Profile;
  profile_destino: Profile;

  friend_origen: Friend[] = [];
  friend_destino: Friend[] = [];

  friend_comun: Friend[] = [];

  ngOnInit(): void {

    if(this.data.length > 1){
      console.log(this.data);
      this.profile_origen = this.data[0];
      this.profile_destino = this.data[1];
      this.comparar(this.profile_origen, this.profile_destino);

    }else{
      console.log(this.data+" BAN o false");
    }    
    
  }

  comparar(p_destino: Profile, p_origen: Profile){

    this.profileService.friend_profile(p_destino.uniqueId).subscribe(data1 => {
      this.friend_destino = data1;

      this.profileService.friend_profile(p_origen.uniqueId).subscribe(data2 =>{
        this.friend_origen = data2;
        
        if(this.friend_origen.length > this.friend_destino.length){
          this.comparar_amigosComun(this.friend_origen, this.friend_destino);
        }else{
          this.comparar_amigosComun(this.friend_destino, this.friend_origen);
        }
      });
    });
    
  }

  comparar_amigosComun(amigos_x: Friend[], amigos_y: Friend[]){
    let conteo = 0;

    amigos_x.forEach(amigox => {
      amigos_y.forEach(amigoy =>{
        if(amigox.name == amigoy.name){
          this.friend_comun.push(amigox);
          conteo++;
        }
      })
    });

    console.log("Amigos en comun es: "+conteo);
    console.log(this.friend_comun);

  }

}
