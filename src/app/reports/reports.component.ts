import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }
  public active:boolean;
  ngOnInit(): void {
    debugger
   jQuery('#firstlink').prop('active',true);
  }

}
