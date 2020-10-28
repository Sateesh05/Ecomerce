import { NgModule } from '@angular/core';
import { OrderchartsComponent } from './ordercharts.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import {  NgxSpinnerModule } from 'ngx-spinner';
import { OrderService } from '../order-creation/order.service';
import { ChartsModule } from 'ng2-charts';
import { CustomarOrderService } from '../customer-portal/customarorder.service';
@NgModule({
    declarations: [
        OrderchartsComponent
    ],
    imports: [
NgxPaginationModule,
CommonModule,ChartsModule,FormsModule,NgxSpinnerModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: OrderchartsComponent
        }
      ])
    ],
    providers: [OrderService,CustomarOrderService],
    exports:[ OrderchartsComponent ]
  })
  export class OrderChartModule { }