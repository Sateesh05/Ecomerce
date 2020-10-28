import { Component, OnInit } from '@angular/core';
import { product } from '../admin-product/product';
import { ProductService } from '../admin-product/product.service';
import { VendarService } from '../vendar/vendar.service';
import { CategoryService } from '../category/category.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { category } from '../category/category';
import { vendar } from '../vendar/vendar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { NotificationService } from '../toastr/toastr.service';
import { DatePipe } from '@angular/common';
declare var jQuery: any;
@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.css']
})
export class OrderCreationComponent implements OnInit {
  public productRecords = new Array<product>();
  public categoryRecords = new Array<category>();
  public vendarRecords = new Array<vendar>();
  term: string;
  public isFormSubmitted: boolean = null;
  pipe = new DatePipe('en-US');

  public createOrderData: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"),
    Validators.maxLength(20)]),
    contactNo: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    orderdate: new FormControl(null, [Validators.required])
  })
  public createOrder = new product();
  public createOrderRecord = new Array<product>();
  constructor(private service: ProductService,
    private vendarService: VendarService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private router: Router,
    private notifyService: NotificationService,
     ) { 
      
    }

  ngOnInit(): void {
    //debugger
    let today:any= new Date()
    let todayDate:any = this.pipe.transform(new Date(today), 'yyyy-MM-dd');
    this.createOrder.orderdate = todayDate;
    this.isFormSubmitted = false;
    this.GetAllProductRecords();
    this.getOrderRecords();
  };
  showCreateOrderToaster() {
    this.notifyService.showSuccess("Order Created Successfully !!", "Alert Notification")
  };
  showUpdateToaster() {
    this.notifyService.showSuccess("Record Updated Successfully !!", "Alert Notification")
  };
  showDeleteToaster() {
    this.notifyService.showSuccess("Record Deleted Successfully !!", "Success Alert ")
  };
  ErrorMessage() {
    this.notifyService.showError('fill the popup fields', 'Alert Notification')
  };
  showBeyondStockmessage() {
    this.notifyService.showWarning('you have beyond the stock limit!!', 'Warning Alert')
  };
  showOutOfStockMessage() {
    this.notifyService.showWarning('Out Of Stock', 'Warning Alert')
  }


  //declaration of the respective id arrays;
  private vendarIdArray: number[] = [];
  private categoryIdArray: number[] = [];

  //get Product List method
  GetAllProductRecords() {
    this.service.GetProductRecords().subscribe((posRes) => {
      if (posRes) {
        this.productRecords = posRes;
        console.log(this.productRecords)
        this.productRecords.map((element, index) => {
          element.sno = index + 1;
          //this.SpinnerService.hide();
        });
        //debugger
        //step1 getting the vendar ids list from productRecors
        this.productRecords.filter((element => this.vendarIdArray.push(element.vendarId)));
        //step2 getting the category ids list from productRecords 
        this.productRecords.filter((element => this.categoryIdArray.push(element.categoryId)));
        //filter Duplicate ids in the vendarIdArray and categoryIdArray
        this.vendarIdArray = [...new Set(this.vendarIdArray)];
        this.categoryIdArray = [...new Set(this.categoryIdArray)];
        let name: string
        // Call the VendarService using foreach update the productList with vendarName
        this.vendarIdArray.forEach(element => {
          this.vendarService.getByIdvendarRecord(element).subscribe((response) => {
            //debugger
            let filterResult = this.productRecords.filter(item => item.vendarId == element);
            filterResult.forEach(element => {
              element.vendar_Name = response[0].name;
              //this.SpinnerService.hide();
            });
          })
        });
        //call the categoryService using foreach update the productList with categoryname

        this.categoryIdArray.forEach(element => {
          this.categoryService.getByIdcategoryRecord(element).subscribe((response) => {
            //debugger
            let filterResult = this.productRecords.filter(item => item.categoryId == element);
            filterResult.forEach(element => {
              element.category_Name = response[0].name;
              //this.SpinnerService.hide();
            });
          })
        });
      };
      //alertmessage
      if (this.productRecords.length == 0) {
        let timerInterval
        Swal.fire({
          title: 'Record Not found your selection!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  //b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      }
      //end alert method
    }, this.ErrorCallBack)
  }
  public ErrorCallBack = (errRes: HttpErrorResponse) => {
    if (errRes.error instanceof Error) {
      console.log('server side error');
    } else {
      console.log('client side error')
      //this.showErrormessage();
    };
  };
  public productFields = new Array<product>();
  public customerRequiredItems = new product();
  onKeyUpEvent(event: any) {
    this.term = null;
    let id = event.target.value;
    this.service.GetProductFields(id).subscribe((poRes => {
      if (poRes) {
        //debugger
        this.productFields = poRes;
        //debugger;
        this.customerRequiredItems = this.productFields[0];
        //console.log(this.productFields)
      }
    }), this.ErrorCallBack)

  };
  public Qntityvalue: number = 1;
  increment_quantity() {
    //this.Qntityvalue=1;
    if (this.Qntityvalue < this.customerRequiredItems.quantity) {
      this.Qntityvalue = this.Qntityvalue + 1;
    } else {
      this.showBeyondStockmessage();
      //alert('you have the beyond the stock limit')
    }
  }
  decrement_quantity() {
    //this.Qntityvalue=0;
    if (this.Qntityvalue > 1) {
      this.Qntityvalue = this.Qntityvalue - 1;
    } else {
      this.showBeyondStockmessage();
      //alert('you have beyond the stock limit')
    }
  };

  public soldItemsArray = new Array<product>();
  public grandTotal: number = 0;
  public isSowPyabtn: boolean;

  addsoldItemsFn() {
    if (this.customerRequiredItems.quantity > 0) {
      //debugger
      this.productFields[0].customQuantity = this.Qntityvalue;

      this.customerRequiredItems = this.productFields[0];

      this.grandTotal = 0;
      console.log(this.customerRequiredItems)
      this.customerRequiredItems.total = this.customerRequiredItems.unitPrice * this.customerRequiredItems.customQuantity;
      let soldobj = this.soldItemsArray.filter(ele => ele.id == this.customerRequiredItems.id);
      if (soldobj.length > 0) {
        soldobj[0].customQuantity = soldobj[0].customQuantity = this.customerRequiredItems.customQuantity;
        this.customerRequiredItems.total = this.customerRequiredItems.unitPrice * this.customerRequiredItems.customQuantity;
        soldobj[0].total = this.customerRequiredItems.total;
      } else {
        this.soldItemsArray.push(this.customerRequiredItems);
        this.isSowPyabtn = true;
      }
      if (this.soldItemsArray.length > 0) {
        this.soldItemsArray.map(element => this.grandTotal += element.total)
      };
      this.Qntityvalue = 1;

    } else {
      this.showOutOfStockMessage();
      //alert('out of stock')
    };
  };
  RemoveItem(id) {
    debugger
    this.soldItemsArray = this.soldItemsArray.filter((obj) => {
      return obj.id !== id;
    })
    //console.log(this.soldItemsArray)
    this.grandTotal = 0;
    if (this.soldItemsArray.length > 0) {
      this.soldItemsArray.map(element => this.grandTotal += element.total)
    };
  };
  getOrderRecords() {
    this.orderService.getOrderRecods().subscribe((posRes) => {
      if (posRes) {
        console.log(posRes)
      }
    })
  }

  OrderSubmition() {
    debugger
    this.isFormSubmitted = true;
    if (this.createOrderData.valid) {
      debugger
      this.createOrder.grandTotal = +this.grandTotal;
      this.createOrder;
      this.soldItemsArray;
      let data = {
        'product': this.createOrder,
        'ordItemarray': this.soldItemsArray
      }
      this.orderService.CreateOrder(data).subscribe((poRes) => {
        if (poRes.insert === 'success') {
          this.getOrderRecords();
          this.createOrder = new product();
          debugger
          this.soldItemsArray = new Array<product>();
          this.router.navigate(['customarPortal']);
          this.showCreateOrderToaster();
        };
      });
    } else {
      this.ErrorMessage();
      //alert('fill the customer create fields')
    }
  };
};  