import {Injectable, Inject} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

    language: string = "en";
    private request: any;
    messageBundle: any;


    constructor( @Inject(HttpClient) private http: HttpClient) {
        this.http = http;
        this.refreshMessageBundle();
    }


    refreshMessageBundle(){
      this.request = this.getBundle();
      this.request.subscribe((data: any) => ( this.messageBundle = data ));
    }

    getBundle() {
        var path = 'assets/i18n';
        var prefix = 'json';
        var userLang = this.language;
        return this.http.get(path + '/' + userLang + '.' + prefix);
    }

}
