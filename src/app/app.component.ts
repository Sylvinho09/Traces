import { Component, OnInit, SimpleChanges} from '@angular/core';
import {GetDataService} from '../Services/get-data.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 

  title = 'app';
   values:any;
  traces:any;
  loggedin:any;
 
  
//Le mettre dans le constructeur permet de l'initialiser 
  public constructor(private getData:GetDataService, private router:Router){}


//app.component est directement appelé lors du lancement de l'application
//on teste donc si l'utilisateur est connecté, et on le redirige ou non vers la page de login selon le résultat
  ngOnInit()
  {
 
      this.getData.getJSON("amiloggedin/").subscribe(res => {
        if(res <0) {
           this.router.navigate(['loginPage']); 
        }
    else {
           this.router.navigate(['Analyzer']); 
    }
}, err => {
console.log("Une erreur est survenue lors de l'envoi de amiloggedin ", err)
});
    

  
  }

}
