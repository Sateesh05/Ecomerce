import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../admin-product/product';
@Injectable({
    providedIn: 'root'
})
export class CustomarOrderService {
    constructor(private http: HttpClient) { }
    public GetOrders():Observable<any> {
        return this.http.get('http://localhost:8000/createOrder')
    };
    public GetOrderItemsById(id): Observable<any> {
        //debugger
        return this.http.get('http://localhost:8000/orderItems/' + id)
    };
    
}