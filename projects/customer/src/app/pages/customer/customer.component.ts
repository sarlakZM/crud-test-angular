import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { ICustomer, ICustomerWithID } from '../../models/customer.model';
import { Column } from '../../models/design-system.model';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { DynamicDialogComponent } from '../../components/dynamic-dialog/dynamic-dialog.component';
import { CustomersStore } from '../../store/customer.store';
import { COLUMN_NAME } from '../../utils/table';

@Component({
  selector: 'app-customer',
  imports: [MatButtonModule, MatIconModule, DynamicTableComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {
  readonly customersStore = inject(CustomersStore);
  readonly dialog = inject(MatDialog);
  readonly columns: Column[] = [...COLUMN_NAME];
  dataSource: ICustomerWithID[] = [];

  constructor() {
    effect(() => {
      this.dataSource = this.customersStore.getCutomers();
    });
  }

  addCustomer() {
    this.dialog.open(DynamicDialogComponent, {
      data: {
        mode: 'add',
        title: 'Add Data',
      },
    });
  }

  itemRemoved(id: number) {
    this.customersStore.removeCustomerByID(id);
  }

  itemChanged(item: ICustomer) {
    this.dialog.open(DynamicDialogComponent, {
      data: {
        mode: 'edit',
        item: item,
        title: 'Edit Data',
      },
    });
  }
}
