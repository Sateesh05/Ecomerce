import { Component, OnInit } from '@angular/core';
import { product } from '../admin-product/product';
import { CustomerReportService } from './customer-report.service';
import { Router } from '@angular/router';
import { CustomarOrderService } from '../customer-portal/customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerService } from "ngx-spinner";  
declare var jQuery:any;
@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {
public queryParms = new product();
public selectCustomer = new Array<product>();
public config:any;
public costomerqueryParm = new product();
public selectedOrderList=new Array<product>()
  constructor(private service:CustomerReportService,
              private router: Router,
              private customerOrderService: CustomarOrderService,
              private invoiceService:OrderItemsService,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.selectCustomer.length
    };
    this.costomerqueryParm.contactNo=0;
    this.costomerqueryParm.toDate=0;
    this.costomerqueryParm.fromDate=0;
    this.GetCustomerList();
    this.GetOrderListInitially(this.costomerqueryParm);
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  GetCustomerList(){
    this.service.GetCustomerList().subscribe((posRes)=>{
      if(posRes){
        this.selectCustomer = posRes;
        console.log(this.selectCustomer);
      }
    })
  };
  GetOrderListInitially(data){
    this.SpinnerService.show(); 
    this.service.GetCustomerOrderList(data).subscribe((posRes)=>{
      if(posRes){
        this.selectedOrderList=posRes;
        console.log(this.selectedOrderList)
        this.selectedOrderList.map((element, index) => {
          element.sno = index + 1;
          this.SpinnerService.hide();
        });
      }
    })
  }
  Search(){
    debugger
  this.selectedOrderList=new Array<product>();
  this.GetOrderListInitially(this.costomerqueryParm);
  };
  back(){
    this.router.navigate(['adminPage']);
  };
  view(){}
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
  };
  close(){}
}
