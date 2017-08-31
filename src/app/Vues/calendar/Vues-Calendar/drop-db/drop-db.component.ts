import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../../../../Services/get-data.service';
import {  Message } from 'primeng/primeng';
import { Router } from "@angular/router/";



@Component({
  selector: 'app-drop-db',
  templateUrl: './drop-db.component.html',
  styleUrls: ['./drop-db.component.css']
})
export class DropDBComponent implements OnInit {
msgs:Message[]=[];

  constructor(private getData : GetDataService, private router: Router) { }

  ngOnInit() {
  }

  //fait appel au serveur pour supprimer toute la base de données
  //le router permet de changer de page (<router-outler> dans la vue)
  //GetDataService est une classe contenue dans le dossier Services
drop_Database()
{
  this.msgs.push({ severity: 'info', summary: 'Base de données en cours de suppression', detail: "Veuillez patienter..." });
  this.getData.getJSON("dropDB").subscribe(res =>
  {
    this.msgs.pop();
    this.router.navigate(['Analyzer']);
  },
  err =>
  {
    this.msgs.pop();
    this.msgs.push({ severity: 'error', summary: 'Error', detail: "La base de données n'a pas pu être vidée " });
    
  });
}

}
