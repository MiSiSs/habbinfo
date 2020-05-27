import { FriendsComponent } from './friends/friends.component';
import { Friend } from './../_model/friends';
import { ProfileService } from './../_service/profile.service';
import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../_model/profile';
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

  amigosComunes: string[];
  
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
  
  openDialog(amigos: string[]){
    this.dialog.open(FriendsComponent, {
      data: amigos
    });

    }

  amigo_usuario(uniqueId: string){
    
    console.log(uniqueId);
    this.profileService.friend_profile(uniqueId).subscribe(data => {      
      
      console.log("tiene "+data.length+" amigos");
      
      if(this.friends.length > data.length){
        this.amigosComunes = this.comparador(data, this.friends);
      }else{
        this.amigosComunes = this.comparador(this.friends, data);
      }
      
      this.openDialog(this.amigosComunes);

    },(error) =>{
      console.error("entro");
    })

    
  }

  comparador(amigoX:Friend[], amigoY:Friend[]){
    let conteo = 0;
    let amigos_comun: string[] = [];
    
    amigoX.forEach(amigoX1 =>{
      amigoY.forEach(amigo2 =>{
        if(amigoX1.name == amigo2.name){
          amigos_comun.push(amigoX1.name);
          conteo++;
        }
      })
    })

    console.log("Amigos en comun es: "+conteo);
    console.log(amigos_comun);
    return amigos_comun;
  }

  limpiar(){
    this.unicode = '';
    this.look = '';
    this.friends = null;
    this.profile = null;
    this.imagen = 'https://www.habbo.es/habbo-imaging/avatarimage?direction=4&head_direction=3&action=wav&gesture=sml&size=m&user=Sr.Guitarron';
  }


  }


