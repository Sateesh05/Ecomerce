import { NgModule } from '@angular/core';
import { CustomerPortalComponent } from './customer-portal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomarOrderService } from './customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    CustomerPortalComponent
  ],
  imports: [
    CommonModule, NgxPaginationModule,NgxSpinnerModule, MatIconModule, HttpClientModule, RouterModule.forChild([
      {
        path: '', component: CustomerPortalComponent
      },
      {
        path: 'ordercreation', loadChildren: () => import('../order-creation/order-creation.module').then(obj => obj.OrderCreatinModule)
      },
      {
        path: '', loadChildren: () => import('../dashbord/dashbord.module').then(obj => obj.DashbordModule)
      },
      
    ])
  ],
  providers: [CustomarOrderService,OrderItemsService],
  exports: [CustomerPortalComponent]
})
export class CustamarPortal { }

