import { Directive,Input } from '@angular/core';
import {Validator,FormControl,NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[appCustomMin],[customMin][formControl],[customMin][ngModel]'
})
export class CustomMinDirective {

  constructor() { }

  @Input()
  customMin:number;

  validate(c: FormControl): {[key: string]: any} {
    let v = c.value;
    return ( v < this.customMin)? {"customMin": true} : null;
}

}
