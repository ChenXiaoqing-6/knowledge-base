import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProviderConfigData } from '../models/IProviderConfigData';
import { CollectionResponse, BooleanResponse } from '../models/IResponse';
// import { MockGeneralConfig, MockProviderConfig } from '../services/mock/mock-data';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  public GetGeneralConfig(): Observable<BooleanResponse> {
    return this.http.get("http://10.130.226.44:8005/api/knowledge-base/v1/general-settings").pipe(
      switchMap((response: any) => {
        return of(
          {
            "isEnable": response.results[0].value == "true" ? true : false
          }
        );
      })
    )
  }

  public getAllProviderConfig(): Observable<CollectionResponse<IProviderConfigData>> {
    return this.http.get("http://10.130.226.44:8005/api/knowledge-base/v1/provider-configurations").pipe(
      switchMap((response: any) => {
        return of(
          {
            "data": response.results,
            "pageSize": response.size,
            "currentPage": response.number,
            "lastPage": response.totalPages,
            "totalObjectCount": response.totalElements
          }
        );
      })
    )
  }

  public putAllProviderConfig(allProviderConfig: IProviderConfigData[]): any {
    return this.http.put("http://10.130.226.44:8005/api/knowledge-base/v1/provider-configurations/" + allProviderConfig[0].id, {
      "providerType": allProviderConfig[0].providerType,
      "isActive": allProviderConfig[0].isActive,
      "siteAuthType": allProviderConfig[0].siteAuthType,
      "siteURL": allProviderConfig[0].siteURL,
      "siteCredential": allProviderConfig[0].siteCredential
    }).pipe(
      switchMap((response: Object) => {
        return of(true);
      })
    )
  }

  public PutGeneralConfig(isEnable: boolean): any {
    return this.http.put("http://10.130.226.44:8005/api/knowledge-base/v1/general-settings/enabled", { "value": isEnable ? "true" : "false" }).pipe(
      switchMap((response: Object) => {
        return of(true);
      })
    )
  }
}
