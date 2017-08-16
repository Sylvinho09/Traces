import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class GetDataService {

  constructor(private http:Http) { }
getJSON(params: string, values?:any[]):Observable<any>
{
/**
 * Permet de récupèrer la valeur émise par le serveur javaEE, le caster en json
 * Les components ayant besoin de ces valeurs ont seulement besoin de faire un subscribe après le getJSON pour lancer la requete 
 */

let url= "http://localhost:8080/TracesRestEE/services/"+params;
//let value:any;
/*let search= new URLSearchParams();
for(let i=0; i< values.length; i++)
{
search.append(""+i, values[i]);
}*/

let allowCredential = new RequestOptions({withCredentials: true} );
let observable = this.http.get(url,allowCredential).map((res:Response)=> res.json());
return observable;



}

postJSON(body:any): Observable<any>
{
  let url ="http://localhost:8080/WebServiceTraces/traces/newTraces";
   var headers = new Headers ();
  //headers.append("Content-Type","application/json");
  let options = new RequestOptions({/*withCredentials: true ,*/ headers: headers});
 
  let observable=this.http.post(url, body, headers); 
  return observable;
}






}
