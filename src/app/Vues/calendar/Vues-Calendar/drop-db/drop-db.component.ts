import { Component, OnInit } from '@angular/core';
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

drop_Database()
{
  this.msgs.push({ severity: 'info', summary: 'Base de données en cours de suppression', detail: "Veuillez patienter..." });
  this.getData.getJSON("dropDB").subscribe(res =>
  {
    this.msgs.pop();
   // this.msgs.push({ severity: 'success', summary: 'Success', detail: "Base de données vidée !" });
    this.router.navigate(['Analyzer']);
  },
  err =>
  {
    this.msgs.pop();
    this.msgs.push({ severity: 'error', summary: 'Error', detail: "La base de données n'a pas pu être vidée " });
    
  });
}

}
