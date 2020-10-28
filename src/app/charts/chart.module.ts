import { NgModule } from '@angular/core';
import { ChartsComponent } from './charts.component';
//import { CategoryService } from './category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ProductService } from '../admin-product/product.service';
import { ChartsModule } from 'ng2-charts';
import { ChartService } from './chart.service';
@NgModule({
    declarations: [
        ChartsComponent
    ],
    imports: [
NgxPaginationModule,
CommonModule,ChartsModule,FormsModule,NgxSpinnerModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: ChartsComponent
        }
      ])
    ],
    providers: [ProductService,ChartService],
    exports:[ ChartsComponent ]
  })
  export class ChartModule { }