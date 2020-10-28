import { NgModule } from '@angular/core';
import { InvoiceComponent } from './invoice.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderItemsService } from './invoice.service'
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule, NgxPaginationModule,NgxSpinnerModule, MatIconModule, HttpClientModule, RouterModule.forChild([
      {
        path: '', component: InvoiceComponent
      },
      {
        path: '', redirectTo: '/', pathMatch: 'full' 
      },
      {
        path: 'customarPortal', loadChildren: () => import('../customer-portal/customer-portal.module').then(obj => obj.CustamarPortal)
      },
    ])
  ],
  providers: [OrderItemsService],
  exports: [InvoiceComponent]
})
export class InvoiceModule { }

