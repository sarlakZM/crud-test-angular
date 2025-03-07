import { Component, computed, effect, Input, input, linkedSignal, output, Signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Column } from '../../models/design-system.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dynamic-table',
  imports: [MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  data = input<any>([], {alias: 'dataSource'});
  dataSource = new MatTableDataSource<any>(this.data());

  columns = input<Column[]>([], {alias: 'columns'});
  displayedColumns: Signal<string[]>  = computed(() => this.columns().map(c => c.columnDef) ); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  itemChanged = output<any>({alias: 'itemChanged'});
  itemRemoved = output<number>({alias: 'itemRemoved'});

  /*
    The effect in the constructor now calls updateTable to ensure 
    the data source and paginator are synchronized.
  */
  constructor() {
    effect(() => {
      this.columns();
      this.updateTable();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateTable() {
    this.dataSource = new MatTableDataSource(this.data());
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

}
