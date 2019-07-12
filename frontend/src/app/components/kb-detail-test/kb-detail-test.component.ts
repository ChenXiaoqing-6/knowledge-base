import { Component, OnInit } from '@angular/core';
import { ModalService } from 'fundamental-ngx';
import { KbDetailComponent } from '../kb-detail/kb-detail.component';
import { IArticle } from '../../models/IArticle';
import { RenderType } from '../../models/RenderType.enum';

@Component({
  selector: 'kb-detail-test',
  templateUrl: './kb-detail-test.component.html',
  styleUrls: ['./kb-detail-test.component.css']
})
export class KbDetailTestComponent implements OnInit {

  private article: IArticle = {
    id: "100",
    provider: "SAP_KMI_MINDTOUCH",
    title: "101test German",
    lastUpdated: new Date(),
    score: 6,
    link: "https://sapdemo-responsive.mindtouch.us/Workstations/test_category",
    renderType: RenderType.IFRAME,
    renderValue: "https://sapdemo-responsive.mindtouch.us/Workstations/test_category?mt-f1=true&mt-view=f1",
    views: 6584,
    author: "admin"
  }

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  testDetail() {
    this.modalService.open(KbDetailComponent, {
      data: {
        article: this.article
      },
      // minHeight: '600px',
      minWidth: '600px'
    });
  }

}
