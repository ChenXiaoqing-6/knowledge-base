import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kb-config-form',
  templateUrl: './kb-config-form.component.html',
  styleUrls: ['./kb-config-form.component.css']
})
export class KbConfigFormComponent implements OnInit {
 
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
