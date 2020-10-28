import { NgModule } from '@angular/core';
import { VendarComponent } from './vendar.component';
import { VendarService } from './vendar.service'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [
        VendarComponent
    ],
    imports: [
      CommonModule,NgxPaginationModule,FormsModule,ReactiveFormsModule,MatTableModule,MatIconModule,MatSortModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: VendarComponent
        }
      ])
    ],
    providers: [VendarService],
    exports:[ VendarComponent ]
  })
  export class VendarModule { }