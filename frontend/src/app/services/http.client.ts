import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class BaseHttpClient {

  constructor(public http: HttpClient) { }

  public get(url: string): Observable<any> {
    return (url) ? this.request(url, 'GET', { body: null }) : throwError('Invalid URL');
  }

  public post(url: string, body: any, responseType?: string): Observable<any> {
    if (responseType) {
      return (url) ? this.request(url, 'POST', { body, responseType }) : throwError('Invalid URL');
    } else {
      return (url) ? this.request(url, 'POST', { body }) : throwError('Invalid URL');
    }
  }

  public patch(url: string, body: any): Observable<any> {
    return (url) ? this.request(url, 'PATCH', { body }) : throwError('Invalid URL');
  }

  public delete(url: string): Observable<any> {
    return (url) ? this.request(url, 'DELETE', { body: null }) : throwError('Invalid URL');
  }

  public request(url: string, method: string, options?: any): Observable<any> {
    return (url) ? this.http.request(method, url, options) : throwError('Invalid URL');
  }
}
