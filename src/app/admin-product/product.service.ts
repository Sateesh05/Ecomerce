import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class ProductService {
    
    constructor(private http:HttpClient){}
    public GetAllProductRecord(data:any):Observable<any>{
        debugger
       let params = JSON.stringify(data)
        return this.http.get('http://localhost:8000/product?Qparms='+params)
    };
    public GetProductRecords():Observable<any>{
        return this.http.get('http://localhost:8000/products')
    };
    public GetProductFields(id:number):Observable<any>{
        debugger
        return this.http.get('http://localhost:8000/productFields/'+id)
    };
    public CreateProductRecord(data:any):Observable<any>{
        //debugger
        return this.http.post('http://localhost:8000/product',data)
    };
    public UpdateProductRecord(id,data:any):Observable<any>{
        //debugger
        return this.http.put('http://localhost:8000/product/'+id,data)
    };
    public deleteRecord(id:number):Observable<any>{
        //debugger
        return this.http.delete('http://localhost:8000/product/'+id)
    };
    public UpdateProductStatus(id:number,data:boolean):Observable<any>{
        let flag ={'flag': data};
        //debugger
        return this.http.put('http://localhost:8000/productstatusUpdate/'+id,flag)
    }
    
    public GetSelectProducts():Observable<any>{
        return this.http.get('http://localhost:8000/selectProducts')
    };
}