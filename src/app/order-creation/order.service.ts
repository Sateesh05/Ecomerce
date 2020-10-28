import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) { }

    public getOrderRecods(): Observable<any> {
        return this.http.get('http://localhost:8000/createOrder');
    };
    public CreateOrder(data): Observable<any> {
        debugger
        return this.http.post('http://localhost:8000/createOrder', data);
    };
    public CreateOrderItems(i, d): Observable<any> {
        return this.http.post('http://localhost:8000/createOrder' + i, d);
    };
}