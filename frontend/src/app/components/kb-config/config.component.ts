import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
// import { KbConfigFacade } from '../../state/config/config.facade';
import { IProviderConfigData } from '../../models/IProviderConfigData';

@Component({
  selector: 'kb-configure',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class KbConfigComponent implements OnInit {

  private onDestroy$: Subject<boolean> = new Subject();
  isEnable$ : Observable<boolean>;
  isMindTouch$ : Observable<boolean>;
  MindTouchConfigData$: Observable<IProviderConfigData[]>;
  isEnable:boolean;
  isMindTouch:boolean;

  constructor(
    // private kbConfigFacade: KbConfigFacade,
  ) { }

  ngOnInit() {
    // this.isEnable$ = this.kbConfigFacade.isEnable();
    // // this.isMindTouch$ = this.kbConfigFacade.isMindTouch();
    // this.MindTouchConfigData$ = this.kbConfigFacade.getProviderConfigureData()
    this.isEnable=false;
    this.isMindTouch=false;
  }

  isEnableChange() {
    this.isEnable = !this.isEnable;
    if(this.isEnable){
      this.isMindTouch=true;
    }
  }

  isMindTouchChange(){
    this.isMindTouch = !this.isMindTouch;
    if(!this.isMindTouch){
      this.isEnable=false;
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
