
export interface ICustomer {
	firstname: string;
	lastname: string;
	dateOfBirth: string;
	phoneNumber: number;
	email: string;
	bankAccountNumber: number;
}


export interface ICustomerWithID extends ICustomer {
    id: number;
}
