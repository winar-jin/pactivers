import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateRegister(user){
    if(user.name == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }
}
