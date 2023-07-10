import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appConfirmedvalidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmedvalidatorDirective,
    multi: true
  }]
})
export class ConfirmedvalidatorDirective implements Validators{

  constructor() { }

  @Input() appConfirmedvalidator!: string; 
  validate(control: AbstractControl): {[key: string]: any} | null{
    const controlToCompare = control.parent?.get(this.appConfirmedvalidator);
    if(controlToCompare && controlToCompare.value !== control.value)
    {
      return {'notEqual': true};
    }
    return null;
  }
}
