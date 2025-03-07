import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { LocalStorageService } from '../../../../shell/src/app/shared/services';
import { ICustomerWithID } from '../models/customer.model';

describe('Service: Customer', () => {
  let service: CustomerService;
  const mockResult: ICustomerWithID[]= [{
    id:55555,
    firstname: 'FirstName',
    lastname: 'Lastname',
    dateOfBirth: '06/03/2025',
    phoneNumber: +981231231212,
    bankAccountNumber: 123456789123,
    email: 'test@gmail.com',
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LocalStorageService,
      ],
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get all customers', async () => {
    const spy: jasmine.Spy = spyOn(
      service,
      'getAll'
    ).and.returnValue(mockResult);
      
    expect(service.getAll()).toBe(mockResult);
    expect(spy).toHaveBeenCalled();

  });
});
