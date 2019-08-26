import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProviderConfigData } from '../../models/IProviderConfigData';
import { IKbState } from '../index';
import { GetGeneralConfig, GetProviderConfig, ChangeSelectedProviderConfig, ChangeSelectedProviderConfigIndex, PostAllProviderConfig, ChangeGeneralActive, ChangeSelectedProviderConfigActive, ReturnToInitialProviderConfig } from './config.actions';
import {
    selectIsEnable,
    selectAllProviderConfig,
    selectCurrentProviderConfig,
    selectIsGeneralConfigCompleted,
    selectIsProviderConfigCompleted,
    temptest
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

    public getAllProviderConfig(): Observable<IProviderConfigData[]> {
        return this.store$.pipe(select(selectAllProviderConfig));
    }

    public getGeneralConfig() {
        this.store$.dispatch(new GetGeneralConfig());
    }

    public getProviderConfig() {
        this.store$.dispatch(new GetProviderConfig());
    }

    public getSelectedProviderConfig(): Observable<number> {
        return this.store$.pipe(select(selectCurrentProviderConfig));
    }

    public ChangeSelectedProviderConfig(data: IProviderConfigData) {
        this.store$.dispatch(new ChangeSelectedProviderConfig(data));
    }

    public ChangeSelectedProviderConfigIndex(data: number) {
        this.store$.dispatch(new ChangeSelectedProviderConfigIndex(data));
    }

    public PostAllProviderConfig( ) {
        this.store$.dispatch(new PostAllProviderConfig());
    }

    public ChangeGeneralActive( ) {
        this.store$.dispatch(new ChangeGeneralActive());
    }

    public ChangeSelectedProviderConfigActive (data: number) {
        this.store$.dispatch(new ChangeSelectedProviderConfigActive(data));
    }

    public ReturnToInitialProviderConfig ( ) {
        this.store$.dispatch(new ReturnToInitialProviderConfig());
    }

    public temptest(): Observable<IProviderConfigData[]> {
        return this.store$.pipe(select(temptest));
    }

}
