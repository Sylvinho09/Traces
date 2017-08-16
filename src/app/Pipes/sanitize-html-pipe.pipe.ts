import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer,SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtmlPipe'
})
export class SanitizeHtmlPipePipe implements PipeTransform {

constructor(protected _sanitizer: DomSanitizer) {

	}
  transform(v:string): SafeHtml {
    
    return this._sanitizer.bypassSecurityTrustHtml(v);
    
  }

}
