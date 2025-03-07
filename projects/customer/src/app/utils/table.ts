import { Column } from "../models/design-system.model";

export const COLUMN_NAME: Column[] = [
    { columnDef: 'firstname', header: 'First Name', cell: (element: any) => `${element.firstname}` },
    { columnDef: 'lastname', header: 'Last Name', cell: (element: any) => `${element.lastname}` },
    { columnDef: 'dateOfBirth', header: 'Date Of Birth', cell: (element: any) => `${element.dateOfBirth}` },
    { columnDef: 'phoneNumber', header: 'Phone Number', cell: (element: any) => `${element.phoneNumber}` },
    { columnDef: 'email', header: 'Email', cell: (element: any) => `${element.email}` },
    { columnDef: 'bankAccountNumber', header: 'Bank Account Number', cell: (element: any) => `${element.bankAccountNumber}` },
    { columnDef: 'actions', header: 'Actions', cell: (element: any) => `${element.actions}` }
  ];