import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kb-config-form',
  templateUrl: './kb-config-form.component.html',
  styleUrls: ['./kb-config-form.component.css']
})
export class KbConfigFormComponent implements OnInit {
 
  profileForm = new FormGroup({
    providerName: new FormControl(''),
    siteURL: new FormControl(''),
    user: new FormControl(''),
    key: new FormControl(''),
    secret: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
