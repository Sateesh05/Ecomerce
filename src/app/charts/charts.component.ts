import { Component, OnInit } from '@angular/core';
import { ChartService } from './chart.service';
import { ProductService } from '../admin-product/product.service';
import { product } from '../admin-product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  private productData: Array<number> = [];
  private productList:Array<string> = [];
  private vendarData: Array<number> = [];
  private vendortList:Array<string> = [];
  private customerData: Array<number> = [];
  private customertList:Array<string> = [];
  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: this.productData, label: 'Product Count' },
    { data: this.customerData, label: 'Customer Count' },
    //{ data: [45, 67, 800, 500], label: 'Account C' }
  ];
  chartLabels = this.productList;
  
  constructor(private service:ChartService,
    private productService:ProductService,
    private router:Router) { }

  ngOnInit(): void {
    this.GetSelectProducts();
    //this.GetcustomerBasedCount();
    setTimeout(() => {
    this.process();
    },800)
  }
  //get Select Products Method
  public productItems = new Array<product>();
  public productArrayList = new Array<product>();
  public customerArrayList = new Array<product>();
  public productListItem = new Array<product>();
  GetSelectProducts(){
    this.productService.GetSelectProducts().subscribe((posRes)=>{
      if(posRes){
        //this.productList = posRes;
        //console.log(this.productList,'product List')
        posRes.forEach(element => {
          //debugger
          this.service.GetproductCount(element.id).subscribe((poSRes)=>{
            if(poSRes){
              this.productArrayList.push(poSRes[0]);
              //this.productList.push(poSRes[0].name);
            }
          })
        });
        posRes.forEach(ele=>{
          this.service.GetcustomerCount(ele.id).subscribe((posRes)=>{
            if(posRes){
              //debugger
              console.log(posRes)
              this.customerArrayList.push(posRes[0]);
            }
          })
        });
        console.log('cust',this.customerArrayList,'produ',this.productArrayList)
      };
    })
  };
  //get sold product count
  private dataObjarray:Array<any>=[];
  process(){
    //debugger
    for(let i=0;i<this.productArrayList.length;i++){
      this.customerArrayList.filter(ele=>{
        if(ele.itemId == this.productArrayList[i].itemId){
          this.dataObjarray.push({'id':ele.itemId,'name':ele.name,'customerCount':ele.customerCount,'productCount':this.productArrayList[i].productCount})
        }
      });
    }
    console.log(this.dataObjarray)
    this.dataObjarray.forEach(element=>{
      this.productList.push(element.name);
      this.productData.push(element.productCount);
      this.customerData.push(element.customerCount);
    })
  }
  onChartClick(event){}
  
    back() {
      this.router.navigate(['reportmodule']);
    }
  
}
