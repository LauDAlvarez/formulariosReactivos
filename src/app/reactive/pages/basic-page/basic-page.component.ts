import { Component } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';

const rtx4070 = {
  name: 'RTX4070',
  price: 2000,
  inStorage: 20
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // }) Manera de realizar un formulario reactivo
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    inStorage: [0, [Validators.required, Validators.min(1)]],
  })

  constructor(
    private fb: FormBuilder
  ){}

  isValidField(fieldName: string): boolean | null{
    return this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched;   
  }

  getFieldError( fieldName: string): string | null{
    if(!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required': 
          return `Este campo es requerido`;
        case 'minlength':
          return `Ingresa al menos ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return '';
  }

  onSave(): void{
    if( this.myForm.invalid ) return;

    console.log(this.myForm.value);
    
    this.myForm.reset(rtx4070);
  }
  

}
