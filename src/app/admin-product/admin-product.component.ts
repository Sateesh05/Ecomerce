import { Component, OnInit } from '@angular/core';
import { product } from './product';
import { category } from '../category/category';
import { vendar } from '../vendar/vendar';
import { ProductService } from  './product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../toastr/toastr.service';
import { CategoryService } from '../category/category.service';
import { VendarService } from '../vendar/vendar.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery:any;
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  public isFormSubmitted:boolean = null;
  public product = new product();
  public queryParms = new product();
  public productRecords = new Array<product>();
  public vendarRecords = new Array<vendar>();
  public categoryRecords = new Array<category>();
  public productData:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.maxLength(20)]),
    description:new FormControl(null, [Validators.required,Validators.maxLength(100)]),
    categoryId:new FormControl(null, [Validators.required]),
    vendarId:new FormControl(null, [Validators.required]),
    quantity:new FormControl(null, [Validators.required]),
    units:new FormControl(null, [Validators.required]),
    unitPrice:new FormControl(null, [Validators.required]),
    dateOfPurchage:new FormControl(null, [Validators.required])
  }) 
  pipe = new DatePipe('en-US');
  constructor(private notifyService:NotificationService,
    private service:ProductService,
    private categoryService:CategoryService,
    private vendarService:VendarService,
    private SpinnerService: NgxSpinnerService) {
    this.queryParms.id=0;
    this.queryParms.vendarId=0;
    this.queryParms.categoryId=0;
     };
  public config:any;
     
  showCreateToaster() {
    this.notifyService.showSuccess("Record Added Successfully !!", "Vendar Records")
  };
  showUpdateToaster() {
    this.notifyService.showSuccess("Record Updated Successfully !!", "Vendar Records")
  };
  showDeleteToaster() {
    this.notifyService.showSuccess("Record Deleted Successfully !!", "Vendar Records")
  };
  showErrormessage() {
    this.notifyService.showError('failed Record added!!', 'Vendar Records')
  };
  showWarningMessage() {
    this.notifyService.showWarning('fill the popup fields', 'Warning')
  };
  showDuplicateWarningMessage() {
    this.notifyService.showWarning('name duplicate is not allowed', 'Warning')
  }
  ngOnInit(): void {
    debugger
    this.GetSelectProducts();
    this.GetallCategoryList();
    this.GetallVendarList();
    this.GetAllProductRecords(this.queryParms);
    this.config = {
      itemsPerPage: 7,
      currentPage: 1,
      totalItems: this.productRecords.length
    };
  };
  pageChanged(event) {
    //this.config.currentPage = event;
  };
  GetProducts(event){
   debugger;
   if(event.target.id == "selectVendar"){
    this.queryParms.vendarId=event.target.value;
   }else{
    this.queryParms.vendarId;
   };
   if(event.target.id == "selectCategory"){
    this.queryParms.categoryId=event.target.value;
   }else{
    this.queryParms.categoryId;
   };
   if(event.target.id == "selectItemid"){
    this.queryParms.id=event.target.value;
   }else{
    this.queryParms.id=0;
   };
   event.target.value;
   this.GetAllProductRecords(this.queryParms);
  };
  //get category List method
  GetallCategoryList(){
    this.categoryService.GetCategoryList().subscribe((posres)=>{
      if(posres){
        this.categoryRecords = posres;
        console.log(this.categoryRecords);
      }
    },this.ErrorCallBack)
  };
  //get vendar List method
  GetallVendarList(){
    this.vendarService.GetVendarList().subscribe((posRes)=>{
      if(posRes){
        this.vendarRecords = posRes;
        console.log(this.vendarRecords)
      }
    })
  };
  //get Select Products Method
  public selectItems=new Array<product>();
  GetSelectProducts(){
    this.service.GetSelectProducts().subscribe((posRes)=>{
      if(posRes){
        this.selectItems=posRes;
        console.log(this.selectItems)
      };
    })
  };
  SearchItem(){
    debugger
    this. productRecords = new Array<product>();
    this.GetAllProductRecords(this.queryParms);
    console.log(this.queryParms);
    
  }
  OpenPopup(item){
    debugger
    if (item) {
      var date = this.pipe.transform (new Date(item.dateOfPurchage),'yyyy-MM-dd')
      item.dateOfPurchage = date;
      jQuery("#m_title").html("Update product Record");
      jQuery("#btn_title").html("Update");
      this.product = item;
    } else {
      debugger
      jQuery("#m_title").html("Add New Record");
      jQuery("#btn_title").html("save");
      this.product.units = '';
      this.product.vendarId = null;
      this.product.categoryId = null;
    }
    jQuery("#productModal").modal("show");
  }
  public ErrorCallBack = (errRes: HttpErrorResponse) => {
    if (errRes.error instanceof Error) {
      console.log('server side error');
    } else {
      console.log('client side error')
      //this.showErrormessage();
    };
  };
//declaration of the respective id arrays;
  private vendarIdArray: number[] = [];
  private categoryIdArray: number[] = [];
//get Product List method
  GetAllProductRecords(data){
    this.SpinnerService.show();
    this.service.GetAllProductRecord(data).subscribe((posRes)=>{
      if(posRes){
        this.productRecords = posRes;
        console.log(this.productRecords)
        this.productRecords.map((element, index) => {
          element.sno = index + 1;
          //this.SpinnerService.hide();
        });
        //debugger
        //step1 getting the vendar ids list from productRecors
        this.productRecords.filter((element=>this.vendarIdArray.push(element.vendarId)));
        //step2 getting the category ids list from productRecords 
        this.productRecords.filter((element=>this.categoryIdArray.push(element.categoryId)));
        //filter Duplicate ids in the vendarIdArray and categoryIdArray
        this.vendarIdArray = [...new Set(this.vendarIdArray)];
        this.categoryIdArray = [...new Set(this.categoryIdArray)];
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
              this.SpinnerService.hide();
            });
          })
        });
      };
  //alertmessage
  if(this.productRecords.length == 0){
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
    },this.ErrorCallBack)
  }
  InsertUpdate(){
    //debugger;
     if (this.product.id > 0) {
       const id = this.product.id;
       const data = { 'product': this.product };
       this.isFormSubmitted = true;
       if (this.productData.valid) {
         //this.SpinnerService.show();
         this.service.UpdateProductRecord(id, data).subscribe((posRes) => {
           if (posRes.update === 'success') {
             this.GetAllProductRecords(this.queryParms);
             this.isFormSubmitted = null;
             this.product = new product();
             //this.SpinnerService.hide();
             this.showUpdateToaster()
             jQuery("#productModal").modal("hide");
           }else if(posRes.errno == 1582){
             this.showDuplicateWarningMessage();
           }
         }, this.ErrorCallBack)
       } ;
     } else {
       this.isFormSubmitted = true;
       if (this.productData.valid) {
         //this.SpinnerService.show();
         this.product.name = this.product.name.trim();
         this.service.CreateProductRecord({ 'product': this.product }).subscribe((posRes) => {
           if (posRes.insert === 'success') {
             this.GetAllProductRecords(this.queryParms);
             this.isFormSubmitted = null;
             this.product = new product();
             //this.SpinnerService.hide();
             this.showCreateToaster();
             jQuery("#productModal").modal("hide");
           }else if(posRes.errno == 1582){
             this.showDuplicateWarningMessage();
           }
         }, this.ErrorCallBack);
      }
    };
   };
   ProductStatus(id:number,data:boolean){
     debugger
     this.service.UpdateProductStatus(id,data).subscribe((posres)=>{
       if(posres.update === 'success'){
         this.GetAllProductRecords(this.queryParms);
       }
     },this.ErrorCallBack)
   };
   Delete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.service.deleteRecord(id).subscribe((posres)=>{
          if(posres.delete === 'success'){
            this.GetAllProductRecords(this.queryParms);
          }
        },this.ErrorCallBack)
      }
    })
  };
  close(){
    this.isFormSubmitted = null;
    this.product = new product();
  }
}
