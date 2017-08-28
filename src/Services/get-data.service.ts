import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class GetDataService {

  constructor(private http:Http) { }
getJSON(params: string):Observable<any>
{
/**
 * Permet de récupèrer la valeur émise par le serveur javaEE, le caster en json
 * Les components ayant besoin de ces valeurs ont seulement besoin de faire un subscribe après le getJSON pour lancer la requete 
 */

let url= "http://10.32.100.49:8080/TracesRestEE/services/"+params;

var headers = new Headers();
//headers.append("Content-Type","text/plain; charset=UTF-8");
let allowCredential = new RequestOptions({withCredentials: true} );
let observable = this.http.get(url,allowCredential).map((res:Response)=> res.json());
return observable;



}



postJSON(body:any): Observable<any>
{
  let url ="http://10.32.100.49:8080/TracesRestEE/services/newTraces";
   var headers = new Headers ();
  //headers.append("Content-Type","application/json");
  let options = new RequestOptions({withCredentials: true , headers: headers});
 
  let observable=this.http.post(url, body, options); 
  return observable;
}






}
