import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-display-blocs',
  templateUrl: './display-blocs.component.html',
  styleUrls: ['./display-blocs.component.css']
})
export class DisplayBlocsComponent implements OnInit {
  columnOptions: any[];
  columns: { field: string; header: string; }[]
  /* tableau qui contient les valeurs DATAS rentrées par l'utilisateur */
  @Input() tabDataAttributes: any[] = [];
  //c'est un tableau qui contient les données rentrées par l'utilisateur (hormis data) lors de la sélection des traces par attribut 
  @Input() lineAttributes: any[] = [];
  //tableau destiné à contenir des valeurs telles que tab[i]=i.
  //Depuis la vue, on peut itérer depuis les éléments d'un tableau, c'est pour cela que cet attribut a été créé
  @Input() nbFilterLine: any[] = [];
  //contiendra les valeurs contenues dans data lors d'un clic sur une ligne
  datas: any[];
  //contiendra le bloc où la trace cliquée appartient
  selectionnedBloc: any[] = [];
  //quand true, affiche la fenetre de dialogue
  displayData: boolean = false;
  columnsEvents: any[] = [];


  constructor() { }

  @Input() blocs: any;
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

    this.columnsEvents = [
      { field: 'event', header: 'Event' },
      { field: 'action', header: 'Action' },
      { field: 'actionTarget', header: 'Action Target' },
      { field: 'actionTargetClass', header: 'Action Target Class' },
      { field: 'actionDetail', header: 'Action Detail' },
    ]

    this.columnOptions = [];
    for (let i = 0; i < this.columns.length; i++) {
      this.columnOptions.push({ label: this.columns[i].header, value: this.columns[i] });

    }

  }
  //appelée lors d'un clic sur une ligne 
  onRowSelected(event) {

    this.datas = [];

    $.each(event.data.data, (index, value) => {

      this.datas.push(index + " : " + value);
    })


    this.displayData = true;



    this.selectionnedBloc = [];
    var i = this.blocs.findIndex(x => x.objectid == event.data.objectid); //permet de récupérer l'index de la ligne cliquée
    if (event.data.event != "NONE") {
      this.selectionnedBloc.push(this.blocs[i]);
      i++;
      while (i != this.blocs.length && this.blocs[i].event == "NONE") {
        this.selectionnedBloc.push(this.blocs[i]);
        i++;
      }
      //on itère tant que l'event == NONE ET que i ne dépasse pas la taille de this.traces
    }
    else if (event.data.event == "NONE") {
      var j = i;
      while (i != this.blocs.length && this.blocs[i].event == "NONE") {

        this.selectionnedBloc.push(this.blocs[i]);
        i++;
      }
      var reverseEvents = this.selectionnedBloc.reverse();


      while (j - 1 != -1 && this.blocs[j - 1].event == "NONE") {
        reverseEvents.push(this.blocs[j - 1]);
        j--;
      }
      if (j - 1 != -1 && this.blocs[j - 1].event != "NONE") {
        reverseEvents.push(this.blocs[j - 1]);
      }
      this.selectionnedBloc = reverseEvents.reverse();
    }

  }

  //permet d'ajouter le bloc auquel appartient la trace cliquée à la sélection par attributs
  addBlocToAttributeSelection() {


    while (this.tabDataAttributes.length > 0) {
      this.tabDataAttributes.pop();
    }
    while (this.lineAttributes.length > 0) {
      this.lineAttributes.pop();
    }
    while (this.nbFilterLine.length > 0) {
      this.nbFilterLine.pop();
    }
    //permet de vérifier qu'il qu'il y a eu au moins 1 résultat (on ne regarde pas la longueur car de base elle vaut 1)
    if (this.blocs[this.blocs.length - 1].agentName != null) {

      this.selectionnedBloc.forEach((tabValue, indice) => {

        this.tabDataAttributes.push([]);
        this.tabDataAttributes[indice].key = [];
        this.tabDataAttributes[indice].value = [];
        this.tabDataAttributes[indice].nbLines = [];
        this.lineAttributes.push([]);
        this.lineAttributes[indice] = {};
        //dans le cas où data ne contient rien, cela permet d'ajouter une ligne d'input de base 

        $.each(tabValue, (index, value) => {
          if (index == "data") {

            if (Object.keys(tabValue.data).length == 0) {

              this.tabDataAttributes[indice].key.push("");
              this.tabDataAttributes[indice].value.push("");
              this.tabDataAttributes[indice].nbLines.push(0);
            }
            else {

              $.each(tabValue.data, (index, value) => {

                this.tabDataAttributes[indice].key.push(index)
                this.tabDataAttributes[indice].value.push(value)
                this.tabDataAttributes[indice].nbLines.push(this.tabDataAttributes[indice].nbLines.length)


              })
            }

          } else {
            if (value != "X") {
              this.lineAttributes[indice][index] = value;
            }

          }



        })

        this.nbFilterLine.push(this.nbFilterLine.length)

      })


    }
  }
}
