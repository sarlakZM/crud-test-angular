import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "../../../../shell/src/app/shared";
import { ICustomerWithID } from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private localStorage = inject(LocalStorageService);
  private key = 'customers'

  getAll() {
    return this.localStorage.get<ICustomerWithID[]>(this.key);
  }

  update(value: ICustomerWithID[] ){
    return this.localStorage.set(this.key, value);

  } 
}