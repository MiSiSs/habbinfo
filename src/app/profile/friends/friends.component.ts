import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
