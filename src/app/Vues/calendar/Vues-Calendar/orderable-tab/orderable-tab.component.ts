import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-orderable-tab',
  templateUrl: './orderable-tab.component.html',
  styleUrls: ['./orderable-tab.component.css']
 // styles :['div.ui-orderlist-controls {display: none !important;}']
})

export class OrderableTabComponent{

  @Input() traces: any;
onSelectionChanged(event)
{
  console.log("liste des traces ");
  console.log(event.value);
}

  constructor() { }

 

}
