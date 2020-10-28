import { Component, OnInit } from '@angular/core';
import { product } from '../admin-product/product';
import { CustomarOrderService } from './customarorder.service';
import { Router } from '@angular/router';
import { OrderItemsService } from '../invoice/invoice.service';
declare var jQuery: any;
@Component({
  selector: 'app-customer-portal',
  templateUrl: './customer-portal.component.html',
  styleUrls: ['./customer-portal.component.css']
})
export class CustomerPortalComponent implements OnInit {
  public config: any;
  public orderRecords = new Array<product>();
  public orderItemsarray = new Array<product>();

  constructor(private service: CustomarOrderService,
              private router:Router,
              private invoiceService:OrderItemsService) { }

  ngOnInit(): void {
    this.GetAllOrders();
    this.config = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.orderRecords.length
    };
  };
  pageChanged(event) {
    this.config.currentPage = event;
  }
  GetAllOrders() {
    //debugger
    this.service.GetOrders().subscribe((posRes) => {
      if (posRes) {
        this.orderRecords = posRes;
        this.orderRecords.map((element, index) => {
          element.sno = index + 1;
          //this.SpinnerService.hide();
        });
        console.log(this.orderRecords);
      }
    })
  }
  OpenPopup(item) { }
  close() {
    this.totalAmount=0;
   }
  public totalAmount:number=0;
  public customerData= new Array<product>();
  //get Customer Details
  GetCustomerDetails(id){
   this.invoiceService.GetCustomerdetail(id).subscribe((posRes)=>{
     if(posRes){
       this.customerData=posRes;
       console.log(this.customerData)
     };
   })
  }
  //Get Order Item Details
  ViewOrderDetail(id) {
    this.GetCustomerDetails(id);
    this.service.GetOrderItemsById(id).subscribe((posRes) => {
      if (posRes) {
        console.log(posRes)
        this.orderItemsarray = posRes;
        debugger
        this.orderItemsarray.map(element => this.totalAmount += element.total)
        console.log(this.totalAmount);
        jQuery("#orderItemsModel").modal("show");
        jQuery("#m_title").html("Order Details");
      }
    })
  };

  NavigateInvoicePage(id){
    debugger
    this.router.navigate(['invoicePage'],{ queryParams: { id: id }});
  }
}
