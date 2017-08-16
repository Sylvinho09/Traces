import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {

constructor() { }
  @Input() traces: any;

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
 
  

 

}
