import { ICustomerWithID } from './customer.model';

export type CustomersState = {
  customers: ICustomerWithID[];
  isLoading: boolean;
};
