import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';
import { SafeUrlPipe } from './safeUrl.pipe';

describe('SafeUrlPipe', () => {
  let pipe;
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  beforeEach(inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    pipe = new SafeUrlPipe(domSanitizer);
  }));

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should safeUrl', () => {
    let bypassSecurityTrustResourceUrlSpy = spyOn(pipe.sanitizer, 'bypassSecurityTrustResourceUrl');
    pipe.transform('dummyThirdPartyUrl');
    expect(bypassSecurityTrustResourceUrlSpy).toHaveBeenCalledTimes(1);
  });

});