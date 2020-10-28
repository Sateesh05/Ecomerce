import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';
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
@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
NgxPaginationModule,
CommonModule,FormsModule,NgxSpinnerModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: CategoryComponent
        }
      ])
    ],
    providers: [CategoryService],
    exports:[ CategoryComponent ]
  })
  export class CategoryModule { }