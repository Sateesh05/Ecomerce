import { Component, OnInit } from '@angular/core';
import { product } from '../admin-product/product';
import { OrderService } from '../order-creation/order.service';
import { Router } from '@angular/router';
import { CustomarOrderService } from '../customer-portal/customarorder.service';

@Component({
  selector: 'app-ordercharts',
  templateUrl: './ordercharts.component.html',
  styleUrls: ['./ordercharts.component.css']
})
export class OrderchartsComponent implements OnInit {
  public orderRecords = new Array<product>();
  private data: Array<number> = [];
  public selectYear = new Date().getFullYear()
  constructor(private service: OrderService,
    private router: Router,
    private getorderItemService: CustomarOrderService) {
      this.GetOrderitemsTotal();
     }
  GetYear(event) {
    debugger
    this.selectYear = event.target.value;
    this.data = [];
    this.GetAllOrders();
    this.chartOptions = {
      responsive: true
    };
    this.chartData = [
      { data: this.data, label: 'OrderRecords' },
    ];
    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  };

  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: this.data, label: 'Sold Amount' },
  ];
  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit(): void {
    this.asyncMethod();
  };
  
  public number: number;
  private orderTotalamounts: Array<any> = [];
  GetOrderitemsTotal() {
    this.service.getOrderRecods().subscribe((posRes) => {
      if (posRes) {
        this.orderRecords = posRes;
        this.orderRecords.forEach(ele => {
          this.getorderItemService.GetOrderItemsById(ele.id).subscribe((posRes) => {
            if (posRes) {
              let num: number = 0;
              posRes.map(element => num += element.total);
              let obj = { 'id': ele.id, 'orderdate': ele.orderdate, 'total': num }
             return this.orderTotalamounts.push(obj);
            };
          });
        });
        console.log(this.orderTotalamounts)
      };
    })
  };
  GetAllOrders() {
    for (var i = 0; i < 12; i++) {
      var num: number = 0;
      this.orderTotalamounts.forEach(ele => {
        debugger
        if (new Date(ele.orderdate).getMonth() == i && new Date(ele.orderdate).getFullYear() == this.selectYear) {
           num += ele.total;
        };
      });
      this.data.push(num);
    };
    console.log('data', this.data)
  };
  onChartClick(event) { }
  back() {
    this.router.navigate(['reportmodule']);
  }
 asyncMethod() {
    setTimeout(() => {
      this.GetAllOrders();
      //console.log("Async Callback");
      //callBack();
    }, 700);
  }
}

