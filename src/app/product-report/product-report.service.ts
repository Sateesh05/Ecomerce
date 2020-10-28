import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class ProductReportService {
    constructor(private http:HttpClient){}
    
    public GetProductOrderList(data:any):Observable<any>{
        let Qparam= JSON.stringify(data)
        debugger
        return this.http.get('http://localhost:8000/productrOrderList?Qparams='+Qparam);
    };
};