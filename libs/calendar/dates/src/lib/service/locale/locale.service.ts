import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor() { }

  getBrowserLanguage(): string {
    const userLang: string = window.navigator.language || window.navigator['userLanguage'];
    return userLang;
  }
}
