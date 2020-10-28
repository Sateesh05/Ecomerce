import{ Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn:'root'
})
export class CategoryService {
    constructor(private http:HttpClient){}
   
    public GetAllCategoryRecords():Observable<any>{
        return this.http.get('http://localhost:8000/category');
    };
    public getByIdcategoryRecord(id:number):Observable<any>{
        //debugger
        return this.http.get('http://localhost:8000/category/'+id);
    };
    public CreateCategoryRecord(data:any):Observable<any>{
        //debugger
        return this.http.post('http://localhost:8000/category',data);
    };
    public UpdateCtegoryRecord(id,data:any):Observable<any>{
        //debugger
        return this.http.put('http://localhost:8000/category/'+id,data);
    };
    public DeleteRecord(id:number):Observable<any>{
        //debugger
        return this.http.delete('http://localhost:8000/category/'+id)
    };
    public GetCategoryList():Observable<any>{
        return this.http.get('http://localhost:8000/categorylist');
    }
}