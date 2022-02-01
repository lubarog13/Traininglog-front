import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null : error;
        };
      }

      static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const re_password: string = control.get('re_password').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== re_password) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('re_password').setErrors({ NoPassswordMatch: true });
        }
      }

      static fieldsRequiredValidator(control: AbstractControl) {
        const selectedOption: number = control.get("selectedOption").value
        if(selectedOption==1) {
          const date: Date = control.get("date").value
          if (date==null) control.get("date").setErrors({required: true})
          control.get("end_date").setErrors(null)
          control.get("start_date").setErrors(null)
        } else {
          if(control.get("start_date").value==null) control.get("start_date").setErrors({required: true})
          if(control.get("end_date").value==null) control.get("end_date").setErrors({required: true})
          control.get("date").setErrors(null)
        }
      }

      static dateTimeValidator(control: AbstractControl) {
        const selectedOption: number = control.get("selectedOption").value
        if(control.get("start_time").value!=null && control.get("end_time").value!=null){
        const start_time: string[] = (control.get("start_time").value).split(":")
        const end_time: string[] = (control.get("end_time").value).split(":")
        if(Number.parseInt(start_time[0])>Number.parseInt(end_time[0]))
          control.get("end_time").setErrors({TooBig: true})
        else if (Number.parseInt(start_time[0])==Number.parseInt(end_time[0]) && Number.parseInt(start_time[1])>Number.parseInt(end_time[1]))
          control.get("end_time").setErrors({TooBig: true})  
        }
        if(selectedOption==1 && control.get("date").value!=null) {
          const date: Date = control.get("date").value
          if (date< new Date()) control.get("date").setErrors({TooSmall: true})
        }
        if(selectedOption==2 && control.get("start_date").value!=null && control.get("end_date").value!=null){
          const start_date: Date = control.get("start_date").value
          const end_date: Date = control.get("end_date").value
          if (start_date< new Date()) control.get("start_date").setErrors({TooSmall: true})
          if (end_date< new Date()) control.get("end_date").setErrors({TooSmall: true})
          if(start_date>=end_date) control.get("end_date").setErrors({TooBig: true})
        }
      }

      static timeValidator(control: AbstractControl) {
        if(control.get("start_time").value!=null && control.get("end_time").value!=null){
          const start_time: string[] = (control.get("start_time").value).split(":")
          const end_time: string[] = (control.get("end_time").value).split(":")
          if(Number.parseInt(start_time[0])>Number.parseInt(end_time[0]))
            control.get("end_time").setErrors({TooBig: true})
          else if (Number.parseInt(start_time[0])==Number.parseInt(end_time[0]) && Number.parseInt(start_time[1])>Number.parseInt(end_time[1]))
            control.get("end_time").setErrors({TooBig: true})  
      }
    }

      static othertypeValidator(control: AbstractControl) {
        const type: string = control.get("type").value
        if(type=="другое" && (control.get("other_type").value==null || control.get("other_type").value.length==0)) {
          control.get("other_type").setErrors({required: true})
        }
      }

      static dateValidator(control: AbstractControl) {
        const start_date: Date = control.get("start_date").value
        const end_date: Date = control.get("end_date").value
        if (start_date< new Date()) control.get("start_date").setErrors({TooSmall: true})
        if (end_date< new Date()) control.get("end_date").setErrors({TooSmall: true})
        if(start_date>=end_date) control.get("end_date").setErrors({TooBig: true}) 
      }
}