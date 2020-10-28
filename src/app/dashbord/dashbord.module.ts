import { NgModule } from '@angular/core';
import { DashbordComponent } from './dashbord.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        DashbordComponent
    ],
    imports: [
      CommonModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: DashbordComponent
        }
      ])
    ],
    providers: [],
    exports:[ DashbordComponent ]
  })
  export class DashbordModule { }