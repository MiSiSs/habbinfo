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

  constructor(@Inject(MAT_DIALOG_DATA) public data: string[], private profileService: ProfileService) { }

  profile_origen: Profile;
  profile_destino: Profile;

  friend_origen: Friend[] = [];
  friend_destino: Friend[] = [];

  friend_comun: Friend[] = [];
  con_amigos: boolean = false;
  amigo_baneado: boolean = false;
  sin_amigos: boolean = false;
  perfil_cerrado: boolean = false;
  name_baneado: string;

  ngOnInit(): void {

    let name_origen = "";
    let name_destino = "";

    name_origen  = this.data[0];
    name_destino = this.data[1];

    this.profileService.name_profile(name_origen).subscribe(data_origen => {
      this.profile_origen = data_origen;

      this.profileService.name_profile(name_destino).subscribe(data_destino => {
        this.profile_destino = data_destino;

        this.comparar(this.profile_destino, this.profile_origen);
      }, amigo_baneado=>{
        this.con_amigos = false;
        this.amigo_baneado = true;
        this.name_baneado = name_destino;
    })
  }) 
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
        
        if(this.friend_comun.length > 0){
          this.con_amigos = true; 
        }else{
          this.con_amigos = false;
          this.sin_amigos = true;
        }
      });
    }, sino => {
      this.con_amigos = false;
      this.sin_amigos = false;
      this.perfil_cerrado = true;
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
  }

}
