import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendarReporttComponent } from './vendar-reportt.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VendarService } from '../vendar/vendar.service';
import { VendorReportService } from './vendor-report.service'
import { CustomarOrderService } from '../customer-portal/customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [
        VendarReporttComponent
    ],
    imports: [
      CommonModule,NgxPaginationModule,NgxSpinnerModule,MatTableModule,FormsModule,MatIconModule,ReactiveFormsModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: VendarReporttComponent
        }
    ])],
    providers:[VendarService,VendorReportService,CustomarOrderService,OrderItemsService],
    exports:[VendarReporttComponent]
})
export class VendorReportModule{}