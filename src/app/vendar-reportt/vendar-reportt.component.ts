import { Component, OnInit } from '@angular/core';
import { product } from '../admin-product/product';
import { VendarService } from '../vendar/vendar.service';
import { VendorReportService } from './vendor-report.service';
import { Router } from '@angular/router';
import { CustomarOrderService } from '../customer-portal/customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery:any;
@Component({
  selector: 'app-vendar-reportt',
  templateUrl: './vendar-reportt.component.html',
  styleUrls: ['./vendar-reportt.component.css']
})
export class VendarReporttComponent implements OnInit {
public config:any;
public vendorqueryParm = new product();
public receivedOrderByvendor = new Array<product>();
public selectVendor = new Array<product>();
  constructor(private vendorService:VendarService,
    private service:VendorReportService,
    private router: Router,
    private customerOrderService: CustomarOrderService,
    private invoiceService:OrderItemsService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.receivedOrderByvendor.length
    };
    debugger
    this.GetVendorList();
    this.vendorqueryParm.vendarId=0;
    this.vendorqueryParm.toDate=0;
    this.vendorqueryParm.fromDate=0;
    this.GetVendarOrderList(this.vendorqueryParm)
  };
  pageChanged(event){
    this.config.currentPage = event;
  }
  GetVendorList(){
    this.vendorService.GetAllVendarList().subscribe((posRes)=>{
      if(posRes){
        this.selectVendor=posRes;
        console.log(this.selectVendor)

      }
    })
  }
  GetVendarOrderList(data){
    this.service.GetVendorOrderList(data).subscribe((posres)=>{
      if(posres){
        console.log(posres);
      this.receivedOrderByvendor=posres;
      
      this.receivedOrderByvendor.map((element, index) => {
        element.sno = index + 1;
        //this.SpinnerService.hide();
      });
      }
    })
  }
  Search(){
    debugger
    this.receivedOrderByvendor = new Array<product>();
   this. GetVendarOrderList(this.vendorqueryParm);
  };
  back(){
    this.router.navigate(['adminPage']);
  }
  public totalAmount:number=0;
  public customerData = new Array<product>();
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
  public totalAmount:number=0;
  public orderItemsarray = new Array<product>();
  ViewOrderDetail(id) {
    this.SpinnerService.show();
    this.GetCustomerDetails(id);
    this.customerOrderService.GetOrderItemsById(id).subscribe((posRes) => {
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
    this.SpinnerService.hide();
  };
  close(){}
}
