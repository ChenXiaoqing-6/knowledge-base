import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { CollectionResponse } from '../models/IResponse';
import { IProviderConfigData } from '../models/IProviderConfigData';
import { mockConfigData } from './mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class KbConfigService {

  constructor() { }


  public getProviderConfigureData(): Observable<CollectionResponse<IProviderConfigData>> {

      return mockConfigData();

  }



}
