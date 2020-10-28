import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class CustomerReportService {
    constructor(private http:HttpClient){}
    
    public GetCustomerList():Observable<any>{
        return this.http.get('http://localhost:8000/customerList');
    };
    public GetCustomerOrderList(data:any):Observable<any>{
        let Qparam= JSON.stringify(data)
        //debugger
        return this.http.get('http://localhost:8000/customerOrderList?Qparams='+Qparam);
    };
};