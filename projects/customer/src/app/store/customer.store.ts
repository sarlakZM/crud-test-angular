import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { ICustomer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { CustomersState } from '../models/store.model';

const initialState: CustomersState = {
  customers: [],
  isLoading: false,
};

export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    customerService: inject(CustomerService),
  })),
  withComputed(({ customers }) => ({
    getCutomers: computed(() => customers()),
    getCutomersEmails: computed(() => customers().map((customer) => customer.email)),
  })),
  withMethods(({ customerService, ...store }) => ({
    async loadCustomers(): Promise<void> {
      patchState(store, { isLoading: true });
      const customers = customerService.getAll() ?? [];
      patchState(store, { customers, isLoading: false });
    },
    updateCustomerByID(id: number, customer: ICustomer): void {
      patchState(store, { isLoading: true });
      patchState(store, (state: CustomersState) => {
        const customers = state.customers.map((item) => (item.id === id ? { id, ...customer } : item));
        customerService.update(customers);
        return { customers, isLoading: false };
      });
    },
    AddCustomer(customer: ICustomer): void {
      patchState(store, { isLoading: true });
      patchState(store, (state: CustomersState) => {
        const customers = [...state.customers, { ...customer, id: Date.now() }];
        customerService.update(customers);
        return { customers: [...customers], isLoading: false };
      });
    },
    removeCustomerByID(id: number): void {
      patchState(store, { isLoading: true });
      patchState(store, (state: CustomersState) => {
        const customers = state.customers.filter((item) => item.id !== id);
        customerService.update(customers);
        return { customers, isLoading: false };
      });
    },
  }))
);
