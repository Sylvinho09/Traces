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



  ngOnInit()
  {
 
      this.getData.getJSON("amiloggedin/").subscribe(res => {
        if(res <0) {console.log("vous n'êtes pas connecté")
           this.router.navigate(['loginPage']); 
        }
    else {console.log("vous êtes connecté")
           this.router.navigate(['Analyzer']); 
    }
}, err => {
console.log("Une erreur est survenue lors de l'envoi de amiloggedin ", err)
});
    

    /*this.getData.getJSON("customers").subscribe(res=>this.values=res,
					err=>console.error(err+" Erreur lors de la récupération des données"),
					() => console.log('Subscribing success'));*/

/*this.getData.getJSON("allTraces").subscribe(res=>this.traces=res,
					err=>console.error(err+" Erreur lors de la récupération des traces"),
					() => console.log('traces ubscribing success'));*/
          
 
  
  }

}
