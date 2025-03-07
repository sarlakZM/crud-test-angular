import { FormControl, FormGroup } from '@angular/forms';
import {
  uniqueFieldValidator,
  uniqueMultiFieldValidator,
  bankAccountNumberValidator,
  mobileNumberValidator,
} from './validators'; // Adjust the path as needed
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

describe('Validation Form: uniqueFieldValidator', () => {
  const existingValues = ['test@example.com'];
  const dialogData = { mode: 'add', item: {}, title: '' };

  it('should return null if the value is unique', () => {
    dialogData.mode = 'add';
    const validator = uniqueFieldValidator(existingValues, dialogData);
    const control = new FormControl('unique@example.com');
    expect(validator(control)).toBeNull();
  });

  it('should return error if the value is not unique', () => {
    dialogData.mode = 'add';
    const validator = uniqueFieldValidator(existingValues, dialogData);
    const control = new FormControl('test@example.com');
    expect(validator(control)).toEqual({
      uniqueField: { value: 'This value is already taken' },
    });
  });

  it('should ignore the value being edited', () => {
    dialogData.mode = 'edit';
    dialogData.item = { email: 'test@example.com' };
    const validator = uniqueFieldValidator(existingValues, dialogData);
    const control = new FormControl('test@example.com');
    expect(validator(control)).toBeNull();
  });
});

describe('Validation Form: uniqueMultiFieldValidator', () => {
  const existingValues = [
    {
      id: 1,
      firstname: 'FirstName',
      lastname: 'Lastname',
      dateOfBirth: new Date('03/07/2025').toDateString(),
    },
  ];
  const dialogData = { mode: 'add', item: {}, title: '' };

  it('should return null if the customer is unique', () => {
    dialogData.mode = 'add';
    const validator = uniqueMultiFieldValidator(existingValues, dialogData);
    const control = new FormGroup({
      firstname: new FormControl('NewFirstName'),
      lastname: new FormControl('Lastname'),
      dateOfBirth: new FormControl(new Date('03/07/2025')),
    });
    expect(validator(control)).toBeNull();
  });

  it('should return error if the customer is not unique', () => {
    dialogData.mode = 'add';
    const validator = uniqueMultiFieldValidator(existingValues, dialogData);
    const control = new FormGroup({
      firstname: new FormControl('FirstName'),
      lastname: new FormControl('Lastname'),
      dateOfBirth: new FormControl(new Date('03/07/2025')),
    });
    expect(validator(control)).toEqual({
      uniqueMultiField: {
        value: 'Customers must be unique: These values ( First Name, Last Name and Date Of Birth) are already taken.',
      },
    });
  });

  it('should ignore the customer being edited', () => {
    dialogData.mode = 'edit';
    dialogData.item = {
      id: 1,
      firstname: 'FirstName',
      lastname: 'Lastname',
      dateOfBirth: new Date('03/07/2025'),
    };
    const validator = uniqueMultiFieldValidator(existingValues, dialogData);
    const control = new FormGroup({
      firstname: new FormControl('FirstName'),
      lastname: new FormControl('Lastname'),
      dateOfBirth: new FormControl(new Date('03/07/2025')),
    });
    expect(validator(control)).toBeNull();
  });
});

describe('Validation Form: bankAccountNumberValidator', () => {
  it('should return null if the bank account number is valid', () => {
    const control = new FormControl('1234567890');
    expect(bankAccountNumberValidator(control)).toBeNull();
  });

  it('should return error if the bank account number is invalid', () => {
    const control = new FormControl('invalid123');
    expect(bankAccountNumberValidator(control)).toEqual({
      invalidBankAccountNumber: { value: 'Invalid bank account number.' },
    });
  });
});

describe('Validation Form: mobileNumberValidator', () => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  it('should return null if the mobile number is valid', () => {
    spyOn(phoneUtil, 'isValidNumberForRegion').and.returnValue(true);
    const control = new FormControl('09123456789');
    expect(mobileNumberValidator(control)).toBeNull();
  });

  it('should return error if the mobile number is invalid', () => {
    spyOn(phoneUtil, 'isValidNumberForRegion').and.returnValue(false);
    const control = new FormControl('invalid123');
    expect(mobileNumberValidator(control)).toEqual({
      invalidMobileNumber: { value: 'Invalid mobile number.' },
    });
  });

  it('should handle exceptions and return error', () => {
    spyOn(phoneUtil, 'parseAndKeepRawInput').and.throwError('Invalid number');
    const control = new FormControl('invalid123');
    expect(mobileNumberValidator(control)).toEqual({
      invalidMobileNumber: { value: 'Invalid mobile number.' },
    });
  });
});
