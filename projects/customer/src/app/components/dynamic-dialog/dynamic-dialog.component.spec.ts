import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';

import { DynamicDialogComponent } from './dynamic-dialog.component';
import { CustomersStore } from '../../store/customer.store';

describe('Component: DynamicDialogComponent', () => {
  let component: DynamicDialogComponent;
  let fixture: ComponentFixture<DynamicDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DynamicDialogComponent>>;
  // let mockCustomersStore: jasmine.SpyObj<CustomersStore>;
  let mockCustomersStore: any;
  const dialogData = {
    mode: 'add',
    item: {},
    title: 'Add Data'
  }
  beforeEach(async () => {
    mockCustomersStore = jasmine.createSpyObj('CustomersStore', 
      ['getCutomersEmails', 'customers', 'AddCustomer', 'updateCustomerByID', 'isLoading']);
  
    mockCustomersStore.isLoading.and.returnValue(false); // Mock isLoading to return false
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DynamicDialogComponent],
      providers: [
        CustomersStore,
        FormBuilder,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: CustomersStore, useValue: mockCustomersStore },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls correctly', () => {
    const controls = component.customerForm.controls;
    expect(controls.firstname.value).toBe('');
    expect(controls.lastname.value).toBe('');
    expect(controls.dateOfBirth.value.toDateString()).toEqual(new Date().toDateString());
    expect(controls.phoneNumber.value).toBe(0);
    expect(controls.email.value).toBe('');
    expect(controls.bankAccountNumber.value).toBe(0);
  });

  it('should call AddCustomer on submit when mode is add', () => {
    dialogData.mode = 'add';
    component.customerForm.setValue({
      firstname: 'firstname',
      lastname: 'lastname',
      dateOfBirth: new Date(),
      phoneNumber: 9123456789,
      email: 'john@example.com',
      bankAccountNumber: 1234567890
    });
    component.onSubmit();
    expect(mockCustomersStore.AddCustomer).toHaveBeenCalledWith(jasmine.objectContaining({ firstname: 'firstname' }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
  
  it('should call updateCustomerByID on submit when mode is edit', () => {
    dialogData.mode = 'edit';
    dialogData.item = { id: 1 };
    fixture.detectChanges();
    component.customerForm.setValue({
      firstname: 'firstname',
      lastname: 'lastname',
      dateOfBirth: new Date(),
      phoneNumber: 9123456789,
      email: 'john@example.com',
      bankAccountNumber: 1234567890
    });
    component.onSubmit();
    expect(mockCustomersStore.updateCustomerByID).toHaveBeenCalledWith(1, jasmine.objectContaining({ firstname: 'firstname' }));
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
  
  
});
