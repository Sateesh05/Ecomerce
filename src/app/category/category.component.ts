import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { category } from './category';
import { CategoryService } from './category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../toastr/toastr.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery:any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public category= new category();
  public categoryRecords = new Array<category>();
  public isFormSubmitted:boolean;
  public categoryData:FormGroup = new FormGroup({
  name:new FormControl(null, [Validators.required,Validators.maxLength(20)]),
  description:new FormControl(null, [Validators.required,Validators.maxLength(100)])
})
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  constructor(private service:CategoryService,
    private notifyService:NotificationService,
    private SpinnerService: NgxSpinnerService) { }
  showCreateToaster() {
    this.notifyService.showSuccess("Record Added Successfully !!", "Alert Notification")
  };
  showUpdateToaster() {
    this.notifyService.showSuccess("Record Updated Successfully !!", "Alert Notification")
  };
  showDeleteToaster() {
    this.notifyService.showSuccess("Record Deleted Successfully !!", "Success Alert ")
  };
  showErrormessage() {
    this.notifyService.showError('failed Record added!!', 'Alert Notification')
  };
  updateErrormessage() {
    this.notifyService.showError('Record Update fail!!', 'Alert Notification')
  };
  showWarningMessage() {
    this.notifyService.showWarning('fill the popup fields', 'Warning Alert')
  };
  showDuplicateWarningMessage() {
    this.notifyService.showWarning('name duplicate is not allowed', 'Warning Alert')
  }

  ngOnInit(): void {
    this.GetAllCategoryRecords();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.categoryRecords.length
    };
  };
  pageChanged(event) {
    this.config.currentPage = event;
  }

  GetAllCategoryRecords(){
    this.SpinnerService.show();
    this.service.GetAllCategoryRecords().subscribe((posRes)=>{
     if(posRes){
       console.log(posRes)
       this.categoryRecords = posRes;
       this.categoryRecords.map((element, index) => {
        element.sno = index + 1;
        this.SpinnerService.hide();
      });
     }
    },this.ErrorCallBack)
  };
  public ErrorCallBack = (errRes: HttpErrorResponse) => {
    if (errRes.error instanceof Error) {
      console.log('server side error');
    } else {
      console.log('client side error')
      //this.showErrormessage();
    };
  };
  OpenPopup(item){
    debugger
    if (item) {
      jQuery("#m_title").html("Update Vendar Record");
      jQuery("#btn_title").html("Update");
      this.category = item;
    } else {
      jQuery("#m_title").html("Add New Record");
      jQuery("#btn_title").html("save");
    }
    //jQuery("#categoryModal").modal("show");
  }
  InsertUpdate(){
   debugger;
    if (this.category.id > 0) {
      const id = this.category.id;
      const data = { 'category': this.category };
      this.isFormSubmitted = true;
      if (this.categoryData.valid) {
        //this.SpinnerService.show();
        this.service.UpdateCtegoryRecord(id, data).subscribe((posRes) => {
          if (posRes.update === 'success') {
            this.GetAllCategoryRecords();
            this.category = new category();
            //this.SpinnerService.hide();
            this.showUpdateToaster()
            this.isFormSubmitted = null;
            jQuery("#categoryModal").modal("hide");
          }else if(posRes.errno == 1582){
            this.showDuplicateWarningMessage();
            alert('duplicate entry not allowed')
          }
        }, this.ErrorCallBack)
      }else{
        this.updateErrormessage()
      }
    } else {
      this.isFormSubmitted = true;
      if (this.categoryData.valid) {
        //this.SpinnerService.show();
        this.category.name = this.category.name.trim();
        this.service.CreateCategoryRecord({ 'category': this.category }).subscribe((posRes) => {
          if (posRes.insert === 'success') {
            this.GetAllCategoryRecords();
            this.isFormSubmitted = null;
            this.category = new category();
            //this.SpinnerService.hide();
            this.showCreateToaster();
            this.isFormSubmitted = null;
            jQuery("#categoryModal").modal("hide");
          }else if(posRes.errno == 1582){
            this.showDuplicateWarningMessage();
            //alert('duplicate entry not allowed')
          }
        }, this.ErrorCallBack);
      }else{this.showErrormessage();}
    };
  }
delete(id){
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
      this.service.DeleteRecord(id).subscribe((posres)=>{
        debugger
        if(posres.delete === 'success'){
          this.GetAllCategoryRecords();
        }
      },this.ErrorCallBack)
    }
  })
};
  close(){
    this.isFormSubmitted = null;
    this.category = new category();
  }
}
