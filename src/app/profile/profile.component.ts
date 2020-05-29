import { Profile } from './../_model/profile';
import { FriendsComponent } from './friends/friends.component';
import { Friend } from './../_model/friends';
import { ProfileService } from './../_service/profile.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Badge } from '../_model/badge';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';


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
      this.imagen = 'https://www.habbo.es/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=Sr.Guitarron';
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

      this.imagen = `https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=`+this.profile.figureString+`&direction=2&head_direction=2`
      this.selectedBadges = this.profile.selectedBadges;
      
      if(data.profileVisible != false){
        this.profileService.friend_profile(data.uniqueId).subscribe(list => { 
          this.friends = list;
          console.log(this.friends.length);
          this.beneado = false;   
        });
      }else{
        this.friends = null;
      }
    }, error =>{
      this.profile = null;
      this.beneado = true;
      this.mensaje = "El usuario no existe o esta baneado";
      this.friends = null;              
    });     

  }
  
  openDialog(amigos: Profile[]){
    
    this.dialog.open(FriendsComponent, {
      data: amigos
    });
    }

  amigo_usuario(name: string){
    let profile: Profile[] = [];

    this.profileService.name_profile(name).subscribe(data => {
      if(data.profileVisible == true){
        profile.push(this.profile, data);
        this.openDialog(profile);
      }else{
        profile.push(data);
        this.openDialog(profile);
      }
    }, error=>{      
      this.openDialog(profile);
    })

  
  }


  limpiar(){
    this.unicode = '';
    this.look = '';
    this.friends = null;
    this.profile = null;
    this.imagen = 'https://www.habbo.es/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=Sr.Guitarron';
  }


  }


