import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomerComponent } from './pages/customer/customer.component';

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
