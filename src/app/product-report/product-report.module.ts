import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReportComponent } from './product-report.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductReportService } from './product-report.service'
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { ProductService } from '../admin-product/product.service';
import { CustomarOrderService } from '../customer-portal/customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [
        ProductReportComponent
    ],
    imports: [
      CommonModule,NgxPaginationModule,NgxSpinnerModule,FormsModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: ProductReportComponent
        }
    ])],
    providers:[ProductService,ProductReportService,CustomarOrderService,OrderItemsService],
    exports:[ProductReportComponent]
})
export class ProductReportModule{}