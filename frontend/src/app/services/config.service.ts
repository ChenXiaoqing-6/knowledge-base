import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProviderConfigData } from '../models/IProviderConfigData';
import { CollectionResponse, BooleanResponse } from '../models/IResponse';
import { MockGeneralConfig, MockProviderConfig } from '../services/mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public GetGeneralConfig(): Observable<BooleanResponse> {
    return MockGeneralConfig();
  }

  public getAllProviderConfig(): Observable<CollectionResponse<IProviderConfigData>> {
    return MockProviderConfig();
  }

  public postAllProviderConfig(data: any): any {
    return true;
  }
}
