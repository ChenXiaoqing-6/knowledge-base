// import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
// import { IKbConfigState } from './config.state';
// import { Actions, ActionTypes } from './config.actions';
// import { IProviderConfigData } from '../../models/IProviderConfigData';

// export const adapter: EntityAdapter<IProviderConfigData> = createEntityAdapter<IProviderConfigData>();

// export const initialKbConfigState: IKbConfigState = adapter.getInitialState({
//     isEnable: false,
//     isError:false
// });

// export function reducer(state = initialKbConfigState, action: Actions): IKbConfigState {

//     switch (action.type) {

//         case ActionTypes.GetProviderConfigureData:
//             return {
//                 ...initialKbConfigState
//             };
//         case ActionTypes.GetProviderConfigureDataSuccess:
//            return adapter.addAll(action.payload.data,{
//                ...state,
//                isActive:action.payload.data[0].isActive
//            });

//         case ActionTypes.GetProviderConfigureDataError:

//             return { ...state,  isError: true };


//         default: {

//             return state;
//         }

//     }
// }

// export const {
//     selectAll
// } = adapter.getSelectors();