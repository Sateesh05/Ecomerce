import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
//import { ChartsComponent } from './charts/charts.component';
//import { NgxSpinnerModule } from "ngx-spinner";  

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserAnimationsModule,ToastrModule.forRoot(),RouterModule.forRoot([
      {
        path:'',loadChildren:()=>import('./dashbord/dashbord.module').then(obj=>obj.DashbordModule)
      },
      {
        path:'admin',loadChildren:()=>import('./admin/admin.module').then(obj=>obj.AdminModule)
      },
      {
        path:'customarPortal',loadChildren:()=>import('./customer-portal/customer-portal.module').then(obj=>obj.CustamarPortal)
      },
      {
        path: 'invoicePage', loadChildren: () => import('./invoice/invoice.module').then(obj => obj.InvoiceModule)
      },
      {
        path: 'adminPage', loadChildren: () => import('./admin/admin.module').then(obj => obj.AdminModule)
      },
      {
        path: 'reportmodule', loadChildren: () => import('./reports/reports.module').then(obj => obj.ReportsModule)
      }
      
      
     
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
