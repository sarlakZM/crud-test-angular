import { Column } from "../models/design-system.model";

export const COLUMN_NAME: Column[] = [
    { columnDef: 'firstname', header: 'firstname', cell: (element: any) => `${element.firstname}` },
    { columnDef: 'lastname', header: 'lastname', cell: (element: any) => `${element.lastname}` },
    { columnDef: 'dateOfBirth', header: 'dateOfBirth', cell: (element: any) => `${element.dateOfBirth}` },
    { columnDef: 'phoneNumber', header: 'phoneNumber', cell: (element: any) => `${element.phoneNumber}` },
    { columnDef: 'email', header: 'Email', cell: (element: any) => `${element.email}` },
    { columnDef: 'bankAccountNumber', header: 'BankAccountNumber', cell: (element: any) => `${element.bankAccountNumber}` },
    { columnDef: 'actions', header: 'Actions', cell: (element: any) => `${element.actions}` }
  ];