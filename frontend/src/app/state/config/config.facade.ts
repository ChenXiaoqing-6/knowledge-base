import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProviderConfigData } from '../../models/IProviderConfigData';
import { IKbState } from '../index';
import { GetGeneralConfig, GetAllProviderConfig, TempSaveSelectedProviderConfig, ChangeSelectedProviderConfigIndex, PutAllProviderConfig, ChangeGeneralActive, ChangeSelectedProviderConfigActive, ReturnToInitialProviderConfig, PutGeneralConfig } from './config.actions';
import {
    selectIsEnable,
    selectAllProviderConfig,
    selectCurrentProviderConfigIndex,
    selectIsGeneralConfigCompleted,
    selectIsProviderConfigCompleted
} from './config.selectors';

@Injectable()
export class KbConfigFacade {

    constructor(private store$: Store<IKbState>) { }

    public isEnable(): Observable<boolean> {
        return this.store$.pipe(select(selectIsEnable));
    }

    public isGeneralConfigReady(): Observable<boolean> {
        return this.store$.pipe(select(selectIsGeneralConfigCompleted));
    }

    public isAllProviderConfigReady(): Observable<boolean> {
        return this.store$.pipe(select(selectIsProviderConfigCompleted));
    }

    public allProviderConfig(): Observable<IProviderConfigData[]> {
        return this.store$.pipe(select(selectAllProviderConfig));
    }

    public getGeneralConfig() {
        this.store$.dispatch(new GetGeneralConfig());
    }

    public getAllProviderConfig() {
        this.store$.dispatch(new GetAllProviderConfig());
    }

    public getSelectedProviderConfigIndex(): Observable<number> {
        return this.store$.pipe(select(selectCurrentProviderConfigIndex));
    }

    public TempSaveSelectedProviderConfig(data: IProviderConfigData) {
        this.store$.dispatch(new TempSaveSelectedProviderConfig(data));
    }

    public ChangeSelectedProviderConfigIndex(data: number) {
        this.store$.dispatch(new ChangeSelectedProviderConfigIndex(data));
    }

    public PutSaveData() {
        this.store$.dispatch(new PutGeneralConfig());
        this.store$.dispatch(new PutAllProviderConfig());
    }

    public ChangeGeneralActive() {
        this.store$.dispatch(new ChangeGeneralActive());
    }

    public ChangeSelectedProviderConfigActive(data: number) {
        this.store$.dispatch(new ChangeSelectedProviderConfigActive(data));
    }

    public ReturnToInitialProviderConfig() {
        this.store$.dispatch(new ReturnToInitialProviderConfig());
    }

}
