import { NgModule } from '@angular/core';
import { OrderCreationComponent } from './order-creation.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ProductService } from './product.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { CategoryService } from '../category/category.service';
import { VendarService } from '../vendar/vendar.service';
import { ProductService } from '../admin-product/product.service';
import { OrderService } from './order.service'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { DatePipe } from '@angular/common';
//import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        OrderCreationComponent
    ],
    imports: [
      CommonModule,Ng2SearchPipeModule,MatTableModule,FormsModule,MatIconModule,ReactiveFormsModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: OrderCreationComponent
        }
     ])
    ],
    providers: [CategoryService,VendarService,ProductService,OrderService],
    exports:[ OrderCreationComponent ]
  })
  export class OrderCreatinModule { }