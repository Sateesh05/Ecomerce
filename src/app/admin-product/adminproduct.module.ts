import { NgModule } from '@angular/core';
import { AdminProductComponent } from './admin-product.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { CategoryService } from '../category/category.service';
import { VendarService } from '../vendar/vendar.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [
        AdminProductComponent
    ],
    imports: [
      CommonModule,NgxPaginationModule,NgxSpinnerModule,MatTableModule,FormsModule,MatIconModule,ReactiveFormsModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: AdminProductComponent
        }
       
     ])
    ],
    providers: [ProductService,CategoryService,VendarService],
    exports:[ AdminProductComponent ]
  })
  export class AdminProductModule { }