import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config';

@Injectable()
export class CloudService {

  constructor(private http: HttpClient) { }

  public getHttp(): HttpClient {
    return this.http;
  }

  public getUrl(endpoint: string): string {
    return `${AppConfig.facadeBaseURL}/${endpoint}`;
  }

  public getTranslations(language: string): Observable<any> {
    const url = `${AppConfig.facadeBaseURL}/localisation/${language}`;
    return this.http.get(url);
  }

}
