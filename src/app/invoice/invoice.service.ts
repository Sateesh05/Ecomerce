import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class OrderItemsService {
    constructor(private http: HttpClient) { }

    public GetOrderItems(id): Observable<any> {
        
        return this.http.get('http://localhost:8000/orderItems/'+id);
    };
    public GetCustomerdetail(id): Observable<any> {
        debugger;
        return this.http.get('http://localhost:8000/customerDetail/'+id);
    };
    
}