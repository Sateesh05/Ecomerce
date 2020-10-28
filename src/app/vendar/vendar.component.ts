import { Component, OnInit } from '@angular/core';
import { vendar } from './vendar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { VendarService } from './vendar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../toastr/toastr.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
@Component({
  selector: 'app-vendar',
  templateUrl: './vendar.component.html',
  styleUrls: ['./vendar.component.css']
})
export class VendarComponent implements OnInit {
public vendar=new vendar();
public vendarRecords=new Array<vendar>();
public isFormSubmitted:boolean;
public vendarData:FormGroup=new FormGroup({
  name:new FormControl(null, [Validators.required,Validators.maxLength(20)]),
  description:new FormControl(null, [Validators.required,Validators.maxLength(100)])
})
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  constructor(private service:VendarService,
    private notifyService:NotificationService) { }

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
   this.GetAllVendarrecords();
   this.config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.vendarRecords.length
  };
  };
  pageChanged(event) {
    this.config.currentPage = event;
  }
  GetAllVendarrecords(){
    this.service.GetAllVendarList().subscribe((posRes)=>{
     if(posRes){
       console.log(posRes)
       this.vendarRecords = posRes;
       this.vendarRecords.map((element, index) => {
        element.sno = index + 1;
        //this.SpinnerService.hide();
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
      this.vendar = item;
    } else {
      jQuery("#m_title").html("Add New Record");
      jQuery("#btn_title").html("save");
    }
    jQuery("#vendarModal").modal("show");
  }
  InsertUpdate(){
   debugger;
    if (this.vendar.id > 0) {
      const id = this.vendar.id;
      const data = { 'vendar': this.vendar };
      this.isFormSubmitted = true;
      if (this.vendarData.valid) {
        //this.SpinnerService.show();
        this.service.UpdateVendarRecord(id, data).subscribe((posRes) => {
          if (posRes.update === 'success') {
            this.GetAllVendarrecords();
            this.vendar = new vendar();
            //this.SpinnerService.hide();
            this.showUpdateToaster()
            jQuery("#vendarModal").modal("hide");
            this.isFormSubmitted = null;
          }else if(posRes.errno == 1582){
            this.showDuplicateWarningMessage();
          }
        }, this.ErrorCallBack)
      };
    } else {
      this.isFormSubmitted = true;
      if (this.vendarData.valid) {
        //this.SpinnerService.show();
        this.vendar.name = this.vendar.name.trim();
        this.service.CreateVendarRecord({ 'vendar': this.vendar }).subscribe((posRes) => {
          if (posRes.insert === 'success') {
            this.GetAllVendarrecords();
            this.isFormSubmitted = null;
            this.vendar = new vendar();
            //this.SpinnerService.hide();
            this.showCreateToaster();
            jQuery("#vendarModal").modal("hide");
            
            this.isFormSubmitted = null;
          }else if(posRes.errno == 1582){
            this.showDuplicateWarningMessage();
          }
        }, this.ErrorCallBack);
     }
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
          this.showDeleteToaster();
          this.GetAllVendarrecords();
        }
      },this.ErrorCallBack)
    }
  })
};
  close(){
    this.isFormSubmitted = null;
    this.vendar = new vendar();
  }
}
