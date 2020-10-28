import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerReportComponent } from './customer-report.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomerReportService } from './customer-report.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CustomarOrderService } from '../customer-portal/customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [
        CustomerReportComponent
    ],
    imports: [
      CommonModule,NgxPaginationModule,NgxSpinnerModule,MatTableModule,FormsModule,MatIconModule,ReactiveFormsModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: CustomerReportComponent
        },
        
    ])],
    providers:[CustomerReportService,CustomarOrderService,OrderItemsService],
    exports:[CustomerReportComponent]
})
export class CusomerReportModule{}