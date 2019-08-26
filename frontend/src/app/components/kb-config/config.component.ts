import { KbConfigFormComponent } from './../kb-config-form/kb-config-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { KbConfigFacade } from '../../state/config/config.facade';
import { IProviderConfigData } from '../../models/IProviderConfigData';

@Component({
  selector: 'kb-configure',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class KbConfigComponent implements OnInit {

  @ViewChild(KbConfigFormComponent) configForm: KbConfigFormComponent;
  private onDestroy$: Subject<boolean> = new Subject();
  isEnable$: Observable<boolean>;
  isGeneralConfigReady$: Observable<boolean>;
  isAllProviderConfigReady$: Observable<boolean>;
  allProviderConfig$: Observable<IProviderConfigData[]>;
  selectedProviderConfigIndex$: Observable<number>;
  temptest$: Observable<IProviderConfigData[]>;


  constructor(
    private kbConfigFacade: KbConfigFacade,
  ) { }

  ngOnInit() {
    this.isEnable$ = this.kbConfigFacade.isEnable();
    this.allProviderConfig$ = this.kbConfigFacade.getAllProviderConfig();
    this.selectedProviderConfigIndex$ = this.kbConfigFacade.getSelectedProviderConfig();
    this.isGeneralConfigReady$ = this.kbConfigFacade.isGeneralConfigReady();
    this.isAllProviderConfigReady$ = this.kbConfigFacade.isAllProviderConfigReady();
    this.temptest$ = this.kbConfigFacade.temptest();
    this.kbConfigFacade.getGeneralConfig();
    this.kbConfigFacade.getProviderConfig();
  }

  onSave() {
    this.tempSaveConfig();
    this.kbConfigFacade.PostAllProviderConfig();
  }

  onCancel() {
    this.kbConfigFacade.ReturnToInitialProviderConfig();
  }

  onSelect(index: number) {
    this.tempSaveConfig();
    this.kbConfigFacade.ChangeSelectedProviderConfigIndex(index + 1);
  }

  tempSaveConfig() {
    this.kbConfigFacade.ChangeSelectedProviderConfig(this.configForm.getCurrentProviderConfig());
  }

  isEnableChange() {
    this.kbConfigFacade.ChangeGeneralActive();
  }

  isSelectedProviderConfigChange(index: number) {
    this.kbConfigFacade.ChangeSelectedProviderConfigActive(index + 1);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
