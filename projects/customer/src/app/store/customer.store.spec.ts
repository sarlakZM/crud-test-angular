import { inject, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CustomersStore } from './customer.store';
import { CustomerService } from '../services/customer.service';
import { CustomersState } from '../models/store.model';
import { ICustomerWithID } from '../models/customer.model';


describe('Store: CustomersStore Methods', () => {
  let store: any;//typeof CustomersStore
  let customerService: jasmine.SpyObj<CustomerService>;
  const initialState: CustomersState = {
    customers: [],
    isLoading: false,
};
  const mockResult: ICustomerWithID[]= [{
    id:1,
    firstname: 'FirstName',
    lastname: 'Lastname',
    dateOfBirth: '06/03/2025',
    phoneNumber: +981231231212,
    bankAccountNumber: 123456789123,
    email: 'test@gmail.com',
  }];
  beforeEach(() => {
    customerService = jasmine.createSpyObj('CustomerService', ['getAll', 'update']);

    TestBed.configureTestingModule({
      providers: [
        CustomersStore,
        { provide: CustomerService, useValue: customerService },
        provideMockStore({ initialState }),

      ]
    });

    store = TestBed.inject(CustomersStore);
    customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
  });

  it('should load customers', async () => {
    customerService.getAll.and.returnValue(mockResult);
    await store.loadCustomers();

    expect(store.getCutomers()).toEqual(mockResult);
    expect(store.isLoading()).toBeFalse();
  });

  it('should update a customer by ID', async () => {
    const mockCustomer = mockResult.at(0);
    store.updateCustomerByID(1, mockCustomer);

    expect(customerService.update).toHaveBeenCalled();
    expect(store.getCutomers().some((c: any)  => c.id === 1)).toBeFalse();

  });

  it('should add a new customer', () => {
    const newCustomer = {
      firstname: 'NewFirstName',
      lastname: 'NewLastname',
      dateOfBirth: '06/03/2025',
      phoneNumber: +981231231212,
      bankAccountNumber: 123456789123,
      email: 'test@gmail.com',
    };
    store.AddCustomer(newCustomer);

    expect(customerService.update).toHaveBeenCalled();
    expect(store.getCutomers().some((c: any) => c.email === newCustomer.email)).toBeTrue();
  });

  it('should remove a customer by ID', () => {
    const mockCustomers = mockResult;
    store.loadCustomers(); // Mock initial load
    store.removeCustomerByID(1);

    expect(customerService.update).toHaveBeenCalled();
    expect(store.getCutomers().some((c: any)  => c.id === 1)).toBeFalse();
  });
});
