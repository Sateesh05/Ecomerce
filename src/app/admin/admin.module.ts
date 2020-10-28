import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
      CommonModule,HttpClientModule,RouterModule.forChild([
        {
          path: '', component: AdminComponent,
          children:[
             {
               path: '',loadChildren:()=>import('../admin-product/adminproduct.module').then(obj=>obj.AdminProductModule)
             },
             {
                path: 'vendar',loadChildren:()=>import('../vendar/vendar.module').then(obj=>obj.VendarModule)
             },
             {
                path: 'catagery',loadChildren:()=>import('../category/category.module').then(obj=>obj.CategoryModule)
             },
             {
                path: 'adminproduct',loadChildren:()=>import('../admin-product/adminproduct.module').then(obj=>obj.AdminProductModule)
             },
            ]
         },
         {
          path: 'reports',loadChildren:()=>import('../reports/reports.module').then(obj=>obj.ReportsModule)
         }
     ])
    ],
    providers: [],
    exports:[ AdminComponent ]
  })
  export class AdminModule { }