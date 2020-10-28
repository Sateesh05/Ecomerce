import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { product } from '../admin-product/product';
import { OrderItemsService } from './invoice.service';
import { ActivatedRoute } from '@angular/router';
//import * as jsPDF from 'jspdf';
import 'jspdf';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
declare let jsPDF:any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChild('htmlData',{static:false}) htmlData:ElementRef;
  public orderItems = new Array<product>();
  constructor(private service: OrderItemsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private SpinnerService: NgxSpinnerService) { }
  private id: number;
  public subtotal: number = 0;
  public base64data:any;
  ngOnInit(): void {
    //convert base64 string in local image
    this.http.get('assets/images/OIP.jpg', { responseType: 'blob' })
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64data = reader.result as string;                
            console.log(this.base64data);
          }

          reader.readAsDataURL(res); 
          console.log(res);
        });
    
//process end

    this.route.queryParams
      //.filter(params => params.order)
      .subscribe(params => {
        this.id = +params.id;
        console.log(this.id);
      })
    this.GetCustomerDetails(this.id);
    this.GetOrderItems(this.id);
  };
  GetOrderItems(id) {
    this.service.GetOrderItems(id).subscribe((posRes) => {
      if (posRes) {
        this.orderItems = posRes;
        this.orderItems.map(el => this.subtotal += el.total);
        console.log(this.subtotal)
      }
    }, (err) => {
      if (err) {
        console.log('error');
      }
    })
  };
  public customerDetail = new Array<product>();
  GetCustomerDetails(id) {
    this.service.GetCustomerdetail(id).subscribe((posRes) => {
      if (posRes) {
        debugger
        this.customerDetail = posRes;
        console.log(this.customerDetail)
      }
    })
  };
  //pdf generation meth
  public openPDF():void {
    debugger
    this.SpinnerService.show();  
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    var img = new Image();
    img.addEventListener('load', function() {
        var doc = new jsPDF();
        doc.addImage(img, 'jpg', 10, 50);
    });
    img.src = 'assets/images/OIP.jpg';
    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.setTextColor(0,25,0);
    doc.setFontSize(28);
    doc.text(230, 28, 'Invoice');
    doc.setFontSize(20);
    doc.setTextColor(0,0,255);
    doc.text(180, 50, 'universal general store');
    doc.setTextColor(0,0,0);
    doc.fromHTML(DATA.innerHTML,15,45,{
      'width': 200,
      'elementHandlers': handleElement,
      
    });
    doc.addImage(this.base64data,'jpg', 350, 8, 150, 30);  
    //doc.output('dataurlnewwindow');
    window.open(URL.createObjectURL(doc.output("blob")))
    this.SpinnerService.hide();  
  }
  

  public downloadPDF():void {
   // debugger
    this.SpinnerService.show();  
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    var img = new Image();
    img.addEventListener('load', function() {
        var doc = new jsPDF();
        doc.addImage(img, 'jpg', 10, 50);
    });
    img.src = 'assets/images/OIP.jpg';
    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.text(250, 20, 'Invoice');
    doc.text(180, 40, 'universal general store');
    doc.fromHTML(DATA.innerHTML,15,45,{
      'width': 200,
      'elementHandlers': handleElement,
      
    });
    doc.addImage(this.base64data,'jpg', 360, 10, 120, 30);  
        //this.filePreview = 'data:image/png' + ';base64,' + base64ImgString;  
       // doc.save('TestPDF')  

    doc.save('angular-demo.pdf');
    this.SpinnerService.hide();  
  }
}
