import { Component, OnInit } from '@angular/core';
import { ModalRef } from 'fundamental-ngx';

@Component({
  selector: 'kb-detail',
  templateUrl: './kb-detail.component.html',
  styleUrls: ['./kb-detail.component.css']
})
export class KbDetailComponent implements OnInit {

  constructor(public modalRef: ModalRef) { 
  }

  ngOnInit() {
  }

}