import { Profile } from './../_model/profile';
import { FriendsComponent } from './friends/friends.component';
import { Friend } from './../_model/friends';
import { ProfileService } from './../_service/profile.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Badge } from '../_model/badge';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { IMG_NAME_BANEADO, IMG_NAME, IMG_BADGES } from '../_shared/var.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  profileForm: FormGroup;
  unicode: string;
  nombre: string;
  look: string;  
  profile: Profile;
  beneado: boolean = false;
  friends: Friend[];
  cantidad: string[];
  mensaje: string;
  imagen: string;
  imagen_baneado: string;
  placas: string;

  selectedBadges: Badge[];

  amigosComunes: Friend[];
  
  constructor(private profileService: ProfileService, private dialog: MatDialog) { 
      this.profileForm = new FormGroup({
        'name': new FormControl('')
      })
  }

  ngOnInit() {
      this.nombre = '';
      this.unicode = '';
      this.look = '';
  }


  buscar(){
    
    let nickname = this.profileForm.value['name'];
    console.log(nickname);
    this.beneado = false;
    this.profileService.name_profile(nickname).subscribe(data => {
      let fecha = moment(data.memberSince).format('YYYY/MM/DD');
      console.log(fecha);
      data.memberSince = fecha;
      this.profile = data;
      this.imagen = IMG_NAME(this.profile.figureString);      
      this.selectedBadges = this.profile.selectedBadges;
      
      if(data.profileVisible != false){
        this.profileService.friend_profile(data.uniqueId).subscribe(list => { 
          this.friends = list;
          this.beneado = false;   
        });
      }else{
        this.friends = null;
      }
    }, error =>{
      this.profile = null;
      this.beneado = true;
      this.mensaje = nickname;
      this.friends = null;   
      this.imagen_baneado = IMG_NAME_BANEADO;  
    });     

  }
  
  openDialog(amigos: string[]){
    
    this.dialog.open(FriendsComponent, {
      data: amigos
    });
    }

  amigo_usuario(name: string){
    console.log(name);
    let amigos_comun: string[] = [];
    amigos_comun.push(this.profile.name, name);

    this.openDialog(amigos_comun);
  } 

  limpiar(){
    this.unicode = '';
    this.look = '';
    this.friends = null;
    this.profile = null;
    this.imagen = 'https://www.habbo.es/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=Sr.Guitarron';
  }


  }


