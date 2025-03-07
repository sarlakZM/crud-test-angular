import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';



export function uniqueFieldValidator(existingValues: string[],  dialogData:{[key:string]: any}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let values = [...existingValues]
        if(dialogData['mode'] == 'edit'){
            values = [...existingValues].filter( item => item != dialogData['item'].email)
        }
        
      const isUnique = !values.includes(control.value);
      return isUnique ? null : { uniqueField: { value: 'This value is already taken' } };
    };
  }

export function uniqueMultiFieldValidator(existingValues: any[], dialogData:{[key:string]: any}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const firstname = control.get('firstname')?.value;
        const lastname = control.get('lastname')?.value;
        const dateOfBirth = control.get('dateOfBirth')?.value;
        let values = [...existingValues];
        if(dialogData['mode'] == 'edit'){
            values = [...existingValues].filter( item => item.id != dialogData['item'].id)
        }
        const isUnique = !values.find( item => (item.firstname == firstname && item.lastname == lastname && item.dateOfBirth == dateOfBirth.toDateString()));
      return isUnique ? null : { uniqueMultiField: { value: 'Customers must be unique: These values ( First Name, Last Name and Date Of Birth) are already taken.' } };
    };
}

export function bankAccountNumberValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[0-9]{10,12}$/; // Example pattern: 10 to 12 digits
    return pattern.test(control.value) ? null : { invalidBankAccountNumber: { value: 'Invalid bank account number.'} };
}
  
export function mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(control.value, 'IR'); // Replace 'IR' with the appropriate country code
      const isValid = phoneUtil.isValidNumberForRegion(phoneNumber, 'IR'); // Replace 'IR' with the appropriate country code
      
      // Format the phone number
      const formattedNumber = phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);

      // Log the formatted number or use it as needed
      console.log('Formatted Number:', formattedNumber);

      return isValid ? null : { invalidMobileNumber: { value : 'Invalid mobile number.'} };
    } catch (e) {
      return { invalidMobileNumber: { value : 'Invalid mobile number.'} };
    };
}