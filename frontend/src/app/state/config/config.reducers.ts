import { IProviderConfigData } from './../../models/IProviderConfigData';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IkbConfigState } from './config.state';
import { Actions, ActionTypes } from './config.actions';
import { ConfigService } from '../../services/config.service';

export const adapter: EntityAdapter<IProviderConfigData> = createEntityAdapter<IProviderConfigData>();

export const initialKbConfigState: IkbConfigState = adapter.getInitialState({
    isGeneralConfigCompleted: false,
    isEnable: false,
    selectedProviderConfigIndex: 1,
    initialAllProviderConfig: [],
    isAllProviderConfigCompleted: false
});

export function reducer(state = initialKbConfigState, action: Actions): IkbConfigState {

    switch (action.type) {

        case ActionTypes.GetGeneralConfig:
            return {
                ...state
            };

        case ActionTypes.GetGeneralConfigSuccess:
            return {
                ...state,
                isEnable: action.payload.isEnable,
                isGeneralConfigCompleted: true
            };

        case ActionTypes.GetGeneralConfigError:
            return {
                ...state
            };

        case ActionTypes.GetProviderConfig:
            return {
                ...state
            };

        case ActionTypes.GetProviderConfigSuccess:
            const initialAllProviderConfig: IProviderConfigData[] = [];
            for (let i = 0; i < action.payload.data.length; i++) {
                initialAllProviderConfig[i] = {
                    id: action.payload.data[i].id,
                    isActive: action.payload.data[i].isActive,
                    providerCode: action.payload.data[i].providerCode,
                    siteAuthType: action.payload.data[i].siteAuthType,
                    siteCredential: action.payload.data[i].siteCredential,
                    siteURL: action.payload.data[i].siteURL,
                    adapterCredential: action.payload.data[i].adapterCredential,
                    adapterURL: action.payload.data[i].adapterURL,
                    adapterAuthType: action.payload.data[i].adapterAuthType
                };
            }
            return adapter.addAll(action.payload.data, {
                ...state,
                selectedProviderConfigIndex: 1,
                initialAllProviderConfig: initialAllProviderConfig,
                isAllProviderConfigCompleted: true
            });

        case ActionTypes.GetProviderConfigError:
            return {
                ...state
            };

        case ActionTypes.ChangeSelectedProviderConfig:
            var tempSiteCredential = {
                user: action.payload.user,
                key: action.payload.key,
                secret: action.payload.secret
            }
            state.entities[state.selectedProviderConfigIndex].siteURL = action.payload.siteURL;
            state.entities[state.selectedProviderConfigIndex].siteCredential = JSON.stringify(tempSiteCredential);
            return state;

        case ActionTypes.ChangeSelectedProviderConfigIndex:
            return {
                ...state,
                selectedProviderConfigIndex: action.payload
            };

        case ActionTypes.PostAllProviderConfig:
            var service = new ConfigService();
            service.postAllProviderConfig(state.entities);
            return state;

        case ActionTypes.ChangeGeneralActive:
            return {
                ...state,
                isEnable: !state.isEnable
            };

        case ActionTypes.ChangeSelectedProviderConfigActive:
            state.entities[action.payload].isActive = !state.entities[action.payload].isActive;
            return state;

        case ActionTypes.ReturnToInitialProviderConfig:
            const initialAllProviderConfig2: IProviderConfigData[] = [];
            for (let i = 0; i < state.initialAllProviderConfig.length; i++) {
                initialAllProviderConfig2[i] = {
                    id: state.initialAllProviderConfig[i].id,
                    isActive: state.initialAllProviderConfig[i].isActive,
                    providerCode: state.initialAllProviderConfig[i].providerCode,
                    siteAuthType: state.initialAllProviderConfig[i].siteAuthType,
                    siteCredential: state.initialAllProviderConfig[i].siteCredential,
                    siteURL: state.initialAllProviderConfig[i].siteURL,
                    adapterCredential: state.initialAllProviderConfig[i].adapterCredential,
                    adapterURL: state.initialAllProviderConfig[i].adapterURL,
                    adapterAuthType: state.initialAllProviderConfig[i].adapterAuthType
                };
            }
            return adapter.addAll(initialAllProviderConfig2, {
                ...state
            });

        default: {

            return state;
        }

    }
}

export const {
    selectAll
} = adapter.getSelectors();