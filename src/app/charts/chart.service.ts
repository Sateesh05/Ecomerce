import{ Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn:'root'
})
export class ChartService {
    constructor(private http:HttpClient){}
   
    public GetproductCount(id):Observable<any>{
        return this.http.get('http://localhost:8000/productBasedCount/'+id);
    };
    
    public GetcustomerCount(id):Observable<any>{
        return this.http.get('http://localhost:8000/customerBasedCount/'+id);
    };
}