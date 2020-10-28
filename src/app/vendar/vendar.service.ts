import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class VendarService {
    constructor(private http:HttpClient){}
    public GetAllVendarList():Observable<any>{
        return this.http.get('http://localhost:8000/vendar');
    };
    public getByIdvendarRecord(id:number):Observable<any>{
        //debugger
        return this.http.get('http://localhost:8000/vendar/'+id);
    };
    public CreateVendarRecord(data:any):Observable<any>{
        //debugger
        return this.http.post('http://localhost:8000/vendar',data);
    };
    public UpdateVendarRecord(id,data:any):Observable<any>{
        //debugger
        return this.http.put('http://localhost:8000/vendar/'+id,data)
    };
    public DeleteRecord(id:number):Observable<any>{
        //debugger
        return this.http.delete('http://localhost:8000/vendar/'+id)
    };
    public GetVendarList():Observable<any>{
        return this.http.get('http://localhost:8000/vendarlist');
    }
    
}