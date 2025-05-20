import { FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `Expected a minimum of ${errors['minlength'].requiredLength} characters`;

        case 'maxlength':
          return `Max length of ${errors['maxlength'].requiredLength} characters`;

        case 'min':
          return `Min value of  ${errors['min'].min}`;

        case 'max':
          return `Max value of ${errors['max'].max}`;

        default:
          return `Not supported error ${key}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }
}
