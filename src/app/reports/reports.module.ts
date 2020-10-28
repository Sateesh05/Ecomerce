import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        ReportsComponent,
    ],
    imports: [
      CommonModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: ReportsComponent,
          children:[
              {
                path: '',loadChildren:()=>import('../customer-report/costomer-report.module').then(obj=>obj.CusomerReportModule)
              },
              {
                path: 'vendarreport',loadChildren:()=>import('../vendar-reportt/vendor-reports.module').then(obj=>obj.VendorReportModule)
              },
              {
                path: 'productreport',loadChildren:()=>import('../product-report/product-report.module').then(obj=>obj.ProductReportModule)
              },
              {
                path: 'customerreport',loadChildren:()=>import('../customer-report/costomer-report.module').then(obj=>obj.CusomerReportModule)
              },
              {
                path: 'reportscharts',loadChildren:()=>import('../ordercharts/ordercharts.module').then(obj=>obj.OrderChartModule)
              },
              {
                path: 'charts',loadChildren:()=>import('../charts/chart.module').then(obj=>obj.ChartModule)
              },
            ]
        },
     ])
    ],
    providers: [],
    exports:[ ReportsComponent ]
  })
  export class ReportsModule { }