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


  constructor(
    private kbConfigFacade: KbConfigFacade,
  ) { }

  ngOnInit() {
    this.isEnable$ = this.kbConfigFacade.isEnable();
    this.allProviderConfig$ = this.kbConfigFacade.allProviderConfig();
    this.selectedProviderConfigIndex$ = this.kbConfigFacade.getSelectedProviderConfigIndex();
    this.isGeneralConfigReady$ = this.kbConfigFacade.isGeneralConfigReady();
    this.isAllProviderConfigReady$ = this.kbConfigFacade.isAllProviderConfigReady();
    this.kbConfigFacade.getGeneralConfig();
    this.kbConfigFacade.getAllProviderConfig();
  }

  onSave() {
    this.tempSaveConfig();
    this.kbConfigFacade.PutSaveData();
  }

  onCancel() {
    this.kbConfigFacade.ReturnToInitialProviderConfig();
  }

  onSelect(index: number) {
    this.tempSaveConfig();
    this.kbConfigFacade.ChangeSelectedProviderConfigIndex(index);
  }

  tempSaveConfig() {
    this.kbConfigFacade.TempSaveSelectedProviderConfig(this.configForm.getCurrentProviderConfig());
  }

  isGeneralEnableChange() {
    this.kbConfigFacade.ChangeGeneralActive();
  }

  isSelectedProviderConfigActiveChange(index: number) {
    this.kbConfigFacade.ChangeSelectedProviderConfigActive(index);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
