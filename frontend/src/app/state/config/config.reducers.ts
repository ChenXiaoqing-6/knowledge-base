import { IProviderConfigData } from './../../models/IProviderConfigData';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IkbConfigState } from './config.state';
import { Actions, ActionTypes } from './config.actions';

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

        case ActionTypes.GetAllProviderConfig:
            return {
                ...state
            };

        case ActionTypes.GetAllProviderConfigSuccess:
            const initialAllProviderConfig: IProviderConfigData[] = [];
            for (let i = 0; i < action.payload.data.length; i++) {
                initialAllProviderConfig[i] = {
                    id: action.payload.data[i].id,
                    isActive: action.payload.data[i].isActive,
                    providerType: action.payload.data[i].providerType,
                    siteAuthType: action.payload.data[i].siteAuthType,
                    siteCredential: action.payload.data[i].siteCredential,
                    siteURL: action.payload.data[i].siteURL
                };
            }
            return adapter.addAll(action.payload.data, {
                ...state,
                selectedProviderConfigIndex: 0,
                initialAllProviderConfig: initialAllProviderConfig,
                isAllProviderConfigCompleted: true
            });

        case ActionTypes.GetAllProviderConfigError:
            return {
                ...state
            };

        case ActionTypes.TempSaveSelectedProviderConfig:
            var tempSiteCredential = {
                user: action.payload.user,
                key: action.payload.key,
                secret: action.payload.secret
            }
            state.entities[state.ids[state.selectedProviderConfigIndex]].siteURL = action.payload.siteURL;
            state.entities[state.ids[state.selectedProviderConfigIndex]].siteCredential = JSON.stringify(tempSiteCredential);
            return state;

        case ActionTypes.ChangeSelectedProviderConfigIndex:
            return {
                ...state,
                selectedProviderConfigIndex: action.payload
            };

        case ActionTypes.PutAllProviderConfig:
            return {
                ...state
            };

        case ActionTypes.PutAllProviderConfigSuccess:
            return {
                ...state,
                initialAllProviderConfig: action.payload
            };

        case ActionTypes.PutGeneralConfig:
            return {
                ...state
            };

        case ActionTypes.PutGeneralConfigSuccess:
            return {
                ...state
            };

        case ActionTypes.ChangeGeneralActive:
            return {
                ...state,
                isEnable: !state.isEnable
            };

        case ActionTypes.ChangeSelectedProviderConfigActive:
            state.entities[state.ids[action.payload]].isActive = !state.entities[state.ids[action.payload]].isActive;
            return {
                ...state
            };

        case ActionTypes.ReturnToInitialProviderConfig:
            const initialAllProviderConfig2: IProviderConfigData[] = [];
            for (let i = 0; i < state.initialAllProviderConfig.length; i++) {
                initialAllProviderConfig2[i] = {
                    id: state.initialAllProviderConfig[i].id,
                    isActive: state.initialAllProviderConfig[i].isActive,
                    providerType: state.initialAllProviderConfig[i].providerType,
                    siteAuthType: state.initialAllProviderConfig[i].siteAuthType,
                    siteCredential: state.initialAllProviderConfig[i].siteCredential,
                    siteURL: state.initialAllProviderConfig[i].siteURL
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