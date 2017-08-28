import { Component, OnInit, Input } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-display-blocs',
  templateUrl: './display-blocs.component.html',
  styleUrls: ['./display-blocs.component.css']
})
export class DisplayBlocsComponent implements OnInit {
  columnOptions: any[];
  columns: { field: string; header: string; }[];

  datas: any[];  
  displayData: boolean = false;
  
  constructor() { }

  @Input() blocs :any;
  ngOnInit() {
    this.columns = [
      
            { field: 'userName', header: 'Username' },
            { field: 'remoteAdress', header: 'Adresse' },
            { field: 'agentName', header: 'Agent Name' },
            { field: 'softwareName', header: 'Software Name' },
            { field: 'softwareRelease', header: 'Software Release' },
            { field: 'softwareVersion', header: 'Software Version' },
            { field: 'data', header: 'Data' },
            { field: 'type', header: 'Type' },
            { field: 'className', header: 'Class Name' },
            { field: 'methodName', header: 'Method Name' },
            { field: 'event', header: 'Event' },
            { field: 'action', header: 'Action' },
            { field: 'actionTarget', header: 'Action Target' },
            { field: 'actionTargetClass', header: 'Action Target Class' },
            { field: 'actionDetail', header: 'Action Detail' },
            { field: 'timeStamp', header: 'timeStamp' },
      
      
          ]

          this.columnOptions = [];
          for (let i = 0; i < this.columns.length; i++) {
            this.columnOptions.push({ label: this.columns[i].header, value: this.columns[i] });
      
          }
  }
  onRowSelected(event) {
   
        new Promise((resolve, reject) => {
          this.datas = [];
    
          $.each(event.data.data, (index, value) => {
    
            this.datas.push(index + " : " + value);
          })
          resolve();
        }).then(() => {
          this.displayData = true;
    
        })
      }
}
