import { Component, effect, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CustomersStore } from '../../store/customer.store';
import { ICustomer } from '../../models/customer.model';


import {
  bankAccountNumberValidator,
  mobileNumberValidator,
  uniqueFieldValidator,
  uniqueMultiFieldValidator,
} from '../../utils/validators';

@Component({
  selector: 'app-dynamic-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
})
export class DynamicDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DynamicDialogComponent>);
  dataDialog = signal(inject(MAT_DIALOG_DATA));
  private readonly customersStore = inject(CustomersStore);
  private readonly fb = inject(FormBuilder);

  customerForm = this.fb.nonNullable.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      phoneNumber: [0, [Validators.required, mobileNumberValidator]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          uniqueFieldValidator(this.customersStore.getCutomersEmails(), this.dataDialog()),
        ],
      ],
      bankAccountNumber: [0, [Validators.required, bankAccountNumberValidator]],
    },
    {
      validators: uniqueMultiFieldValidator(this.customersStore.customers(), this.dataDialog()),
    }
  );

  constructor() {
    effect(() => {
      if (this.dataDialog().mode === 'edit') {
        if (this.dataDialog().item) {
          const customer = { ...this.dataDialog().item };
          delete (customer as any).id;
          this.customerForm.patchValue({
            ...customer,
            dateOfBirth: new Date(customer.dateOfBirth),
          });
        }
      }
    });
  }

  onSubmit() {
    const customer = {
      ...this.customerForm.value,
      dateOfBirth: this.customerForm.value.dateOfBirth?.toDateString(),
    };
    this.dataDialog().mode === 'add' //Add Customer
      ? this.customersStore.AddCustomer(customer as ICustomer) //Edit Customer
      : this.customersStore.updateCustomerByID(this.dataDialog().item.id, customer as ICustomer);

    if (!this.customersStore.isLoading()) {
      this.dialogRef.close();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.customerForm.get(controlName);
    const errors = control?.errors;

    if (control?.invalid && (control.touched || control.dirty) && errors) {
      if (errors['email'] || errors['matDatepickerParse']) {
        return 'The value is invalid.';
      } else if (errors['required']) {
        return 'The value is required.';
      } else if (errors['invalidMobileNumber']) {
        return errors['invalidMobileNumber'].value;
      } else if (errors['invalidBankAccountNumber']) {
        return errors['invalidBankAccountNumber'].value;
      } else if (errors['uniqueField']) {
        return errors['uniqueField'].value;
      }
    }

    return '';
  }
}
