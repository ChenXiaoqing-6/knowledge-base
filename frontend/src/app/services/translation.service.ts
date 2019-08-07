import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudService } from './cloud.service';


@Injectable()
export class TranslationService {

  constructor(public translate: TranslateService, public cloudService: CloudService) { }

  public loadTranslations(language: string): Observable<string> {

    return this.cloudService.getTranslations(language).pipe(
      map(translations => {
        this.translate.setTranslation(language, translations, true);
        this.translate.use(language);
        return language;
      })
    );

  }

}
