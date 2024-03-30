import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames:   this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder){}

  get favoriteGamesControl(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(fieldName: string): boolean | null{
    return this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched;   
  }

  isValidFieldInArray(formArray: FormArray, i: number){
    return formArray.controls[i].errors && formArray.controls[i].touched;
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

  onDeleteFavorite(i: number): void {
    this.favoriteGamesControl.removeAt(i);
  }

  onAddToFavorite(): void{
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value
    this.favoriteGamesControl.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  onSubmit(): void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.controls['favoriteGames'] = new FormArray([])
    this.myForm.reset()
  }
}
