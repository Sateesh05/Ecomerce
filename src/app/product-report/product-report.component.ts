import { Component, OnInit } from '@angular/core';
import { product } from '../admin-product/product';
import { ProductService } from '../admin-product/product.service';
import { ProductReportService } from './product-report.service';
import { Router } from '@angular/router';
import { CustomarOrderService } from '../customer-portal/customarorder.service';
import { OrderItemsService } from '../invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery:any;
@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.css']
})
export class ProductReportComponent implements OnInit {
public config:any;
public productRecords = new Array<product>();
public productqueryParm = new product();
public receivedOrderByproduct= new Array<product>();
  constructor(private productService:ProductService,
      private service:ProductReportService,
      private router: Router,
      private customerOrderService: CustomarOrderService,
              private invoiceService:OrderItemsService,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.productRecords.length
    };
    this.productqueryParm.productId=0;
    this.productqueryParm.toDate=0;
    this.productqueryParm.fromDate=0;
    this.GetSelectProducts();
    this.GetProductOrderList(this.productqueryParm);
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  //get Select Products Method
  public selectItems=new Array<product>();
  GetSelectProducts(){
    this.productService.GetSelectProducts().subscribe((posRes)=>{
      if(posRes){
        this.productRecords=posRes;
        console.log(this.productRecords)
      };
    })
  };
  //get product based reports method
  GetProductOrderList(data){
    this.SpinnerService.hide();
    this.service.GetProductOrderList(data).subscribe((posRes)=>{
      if(posRes){
        console.log(posRes);
        this.receivedOrderByproduct=posRes;
        this.receivedOrderByproduct.map((element, index) => {
          element.sno = index + 1;
          this.SpinnerService.hide();
        });
      };
    })
  };
  Search(){
    this.receivedOrderByproduct = new Array<product>();
    this.GetProductOrderList(this.productqueryParm);
    //this.productqueryParm=new product();
  };
  back(){
    this.router.navigate(['adminPage']);
  };
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
