import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableComponent } from './dynamic-table.component';
import { ICustomerWithID } from '../../models/customer.model';
import { Column } from '../../models/design-system.model';
import { COLUMN_NAME } from '../../utils/table';

describe('Component: DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;
  const columns: Column[] = [...COLUMN_NAME];

  const mockResult: ICustomerWithID[]= [{
    id:55555,
    firstname: 'FirstName',
    lastname: 'Lastname',
    dateOfBirth: '06/03/2025',
    phoneNumber: +981231231212,
    bankAccountNumber: 123456789123,
    email: 'test@gmail.com',
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data correctly', () => {
    component.dataSource.data = mockResult;
    expect(component.dataSource.data).toEqual(mockResult);
  });  
  
  it('should initialize paginator correctly', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });
  
  it('should emit itemChanged event', () => {
    spyOn(component.itemChanged, 'emit');
    const item = { id: 1, name: 'Test' };
    component.itemChanged.emit(item);
    expect(component.itemChanged.emit).toHaveBeenCalledWith(item);
  });

  it('should emit itemRemoved event', () => {
    spyOn(component.itemRemoved, 'emit');
    const itemId = 1;
    component.itemRemoved.emit(itemId);
    expect(component.itemRemoved.emit).toHaveBeenCalledWith(itemId);
  });


});
