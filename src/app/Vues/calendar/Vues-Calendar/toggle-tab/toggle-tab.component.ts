import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, DataTable, Message, Listbox, Checkbox, Button } from "primeng/primeng";
import { GetDataService } from "Services/get-data.service";
declare var $: any;
@Component({
  selector: 'app-toggle-tab',
  templateUrl: './toggle-tab.component.html',
  styleUrls: ['./toggle-tab.component.css']
})
export class ToggleTabComponent implements OnInit {

  @Input() traces: any = null;
  @Input() tracesCopie: any = null;
  //@Input() tracesCopie: any = null;
  tracesVide: any;
  unfound: boolean = false;
  newinput: boolean = false;
  keytoFilter: any;

  begin: boolean = false;
  columns: any[]
  columnOptions: SelectItem[];
  //pour l'affichage du message en cas de filtre qui ne donne rien 
  msgs: Message[] = [];
  //utilisé pour l'affichage de la fenetre de sélection des sessions
  display: boolean = false;
  //utilisé pour afficher les valeurs dans l'objet datas
  displayData: boolean = false;
  datas: any[];
  //permet de savoir si c'est la premiere fois que l'utilisateur veut filtrer par session pour cocher toutes les cases
  isFirstSelection: boolean = true;
  @Input() selectOptions: any;
  @Input() totalRecords: any = 0;
  @Input() minDate: any;
  @Input() maxDate: any;
  // tranche: any = 1;
  events: any[] = []; //sa valeur indiquera la valeur des blocs actions
  columnsEvents: any[] = [];
  numberOfLines: SelectItem[] = [];
  selectedNumberOfLine: any = 0;
  selectedLine: any;
  @Input() tabDataAttributes: any[] = [];
  @Input() lineAttributes: any[] = [];
  constructor(private getData: GetDataService) {
  }

  ngOnInit() {

    this.traces = [
      { sessionId: 'Aucune recherche effectuée.' }



    ]




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

  show() {
    this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Ce filtre n\'a rien donné...' });
  }

  update(dt: DataTable) {
    dt.reset();
    //met "" dans le champ input filtre colonne
    dt.filter("", "softwareVersion", "contains");


  }

  showDialog(pl: Listbox) {

    /**
     * L'algo ci-dessous coche toutes les cases de la listbox mais pas celle du haut
     */

    /*if (this.isFirstSelection == true && this.traces[0].userName != null) {


      let tab: any[] = [];
      pl.value = [];
      this.traces.forEach(element => {
        if (!tab[element.sessionId]) {
          pl.value.push(element.sessionId);
        }
        else tab[element.sessionId] = 1;
      });
    }
    if (this.traces[0].userName != null)
      this.isFirstSelection = false;*/

    this.display = true;


  }

  /**
   * L'algo ci-dessous est fait pour pallier au fait que lors d'un filtre qui ne renvoie aucune valeur
   * la barre de scroll disparait et il est impossible d'accéder aux colonnes en dehors de la page du navigateur
   */



  applyFilter(dt: DataTable, event) {

    if (this.traces.length > 1) {
      if (this.unfound == true) {
        this.unfound = false;
      }
      if (event.filteredValue.length == 0) {
        this.msgs = [];
        //this.traces = this.tracesCopie;
        this.unfound = true;
        this.newinput = true;
        this.keytoFilter = Object.keys(event.filters)[0]
        this.show();
        dt.filter("", this.keytoFilter, "contains");
      }

    }
    else if (this.begin == false) {
      this.begin = true;
      dt.filter("", Object.keys(event.filters)[0], "contains");
    }
    else this.begin = false;
  }


  onSessionsSelectedChange(event, pl: Listbox) {
    if (this.tracesCopie != null) {
      this.traces = []//this.tracesCopie;
      let tab: any[] = [];
      event.value.forEach(element => {
        tab[element] = 1;
      });
      let length = event.value.length;
      var getTraces = this.traces;

      this.tracesCopie.forEach(element => {
        if (tab[element.sessionId]) {
          this.traces.push(element);
        }
      });
    }
    pl.value.push(event.value);


  }


  /**
   * Explication du Promise:
   * Le code exécuté en premier est celui situé entre le Promise et le resolve.
   * Quand resolve est appelé, l'enchainement passe au .then suivant (avec des paramètres si paramètres passés dans le resolve)
   * un .catch() peut etre mis a la fin si un reject() est appelé (cas d'erreur)
   */

  /**
   * Important: les Fat Arrows c'est la vie, ils permettent de ne pas perdre le scope (contrairement à fct(function(){...});)
   */
  onRowSelected(event) {

    //on récupère la valeur de la trace associée à la ligne cliquée pour pouvoir
    //récupérer les valeurs des attributs pour la méthode d'ajout des attributs dans la sélection par attributs
    this.selectedLine = event.data;
    console.log("valeur de selectedLine ", this.selectedLine);
    new Promise((resolve, reject) => {
      this.datas = [];

      $.each(event.data.data, (index, value) => {

        this.datas.push(index + " : " + value);
      })
      resolve();
    }).then(() => {
      this.displayData = true;

    })

    this.numberOfLines = [];
    for (let i = 0; i < this.tabDataAttributes.length; i++) {
      this.numberOfLines.push({ label: "" + i, value: i });
    }

    this.events = [];

    var session = event.data.sessionId;
    var tracesBySession: any[] = [];
    /*
    important dans le cas où plusieurs sessions sont actives en même temps et déclenchent des actions en même temps 
    */
    tracesBySession = this.traces.filter(x => {
      return x.sessionId == session;
    })

    var i = tracesBySession.findIndex(x => x.objectid == event.data.objectid); //permet de récupérer l'index de la ligne cliquée

    if (event.data.event != "NONE") {
      this.events.push(tracesBySession[i]);
      i++;
      while (i != tracesBySession.length && tracesBySession[i].event == "NONE") {
        this.events.push(tracesBySession[i]);
        i++;
      }
      //on itère tant que l'event == NONE ET que i ne dépasse pas la taille de this.traces
    }
    else if (event.data.event == "NONE") {
      var j = i;
      while (i != tracesBySession.length && tracesBySession[i].event == "NONE") {

        this.events.push(tracesBySession[i]);
        i++;
      }
      var reverseEvents = this.events.reverse();


      while (j - 1 != -1 && tracesBySession[j - 1].event == "NONE") {
        reverseEvents.push(tracesBySession[j - 1]);
        j--;
      }
      if (j - 1 != -1 && tracesBySession[j - 1].event != "NONE") {
        reverseEvents.push(tracesBySession[j - 1]);
      }
      this.events = reverseEvents.reverse();
    }
  }

  downloadAndExport() {
    let downloadTraces: any[] = [];
    let j = 1;
    let totalDownload = 1;
    /** on commence à 100000 car on a déjà la première tranche **/

    this.exportJson(this.traces);

    for (let i = 100000; i < this.totalRecords; i += 100000) {
      totalDownload++;
    }
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Téléchargement', detail: "Téléchargement en cours... " + j + "/" + totalDownload });

    if (this.totalRecords < 100001) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Téléchargement', detail: "Téléchargement terminé!" });

    }
    else {
      new Promise((resolve, reject) => {
        for (let i = 100000; i < this.totalRecords; i += 100000) {
          console.log("requetage d'une tranche");
          this.getData.getJSON("between/" + this.minDate + "/" + this.maxDate + "/" + j + "/").subscribe(res => {
            console.log("valeur de res " + j + " ", res);


            console.log("valeur de i: " + i)
            this.exportJson(res);
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Téléchargement', detail: "Téléchargement en cours... " + j + "/" + totalDownload });

            if (i + 100000 > this.totalRecords) //car on commence à la 100001 eme valeur
            {
              console.log("je lance le resolve");
              resolve();
            }
          })
          j++;
        }
      }).then(() => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Téléchargement', detail: "Téléchargement terminé!" });

      })
    }

  }


  /**
   * Ici, on crée un Blob(semblable à un fichier)
   * On crée un element <a> pour download
   * On nomme le fichier qui va être exporté
   * On crée l'url associée à l'objet blob
   * on cache le lien
   * on ajoute le lien au document
   * on simule un click pour activer le download
   **/
  exportJson(res: any) {

    /* ca ne sert a rien de telecharger si le nombre total de records est egal a 0 */
    if (this.totalRecords > 0) {
      var blob = new Blob([JSON.stringify(res)], { type: "application/json" });
      var downloadLink = document.createElement("a");

      downloadLink.download = "tracesExport.json";
      downloadLink.href = window.URL.createObjectURL(blob);
      //cacher le lien
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  }

  addLineToAttributeSelection() {
    //permet de vérifier qu'il qu'il y a eu au moins 1 résultat (on ne regarde pas la longueur car de base elle vaut 1)
    if (this.traces[this.traces.length - 1].agentName != null) {
      console.log("valeur de la ligne sélectionnée ", this.selectedNumberOfLine)
      this.tabDataAttributes[this.selectedNumberOfLine].key = [];
      this.tabDataAttributes[this.selectedNumberOfLine].value = [];
      this.tabDataAttributes[this.selectedNumberOfLine].nbLines = [];
      // this.tabDataAttributes[this.selectedNumberOfLine].push({ key: [], value: [], nbLines: [] });
      this.lineAttributes[this.selectedNumberOfLine] = {};

      $.each(this.selectedLine, (index, value) => {
        if (index == "data") {
          console.log("je suis rentré dans la condition index==\"data\"");

          //dans le cas où data ne contient rien, cela permet d'ajouter une ligne d'input de base 
          if (Object.keys(this.selectedLine.data).length == 0) {

            this.tabDataAttributes[this.selectedNumberOfLine].key.push("");
            this.tabDataAttributes[this.selectedNumberOfLine].value.push("");
            this.tabDataAttributes[this.selectedNumberOfLine].nbLines.push(0);
          }
          else {

            $.each(this.selectedLine.data, (index, value) => {
              console.log("valeur de l'index", index, "valeur de value ", value)
              console.log("valeur de tabdata a l'indice ", this.tabDataAttributes[this.selectedNumberOfLine])
              this.tabDataAttributes[this.selectedNumberOfLine].key.push(index)
              this.tabDataAttributes[this.selectedNumberOfLine].value.push(value)
              this.tabDataAttributes[this.selectedNumberOfLine].nbLines.push(this.tabDataAttributes[this.selectedNumberOfLine].nbLines.length)


            })
          }
        } else {
          if (value != "X") {
            this.lineAttributes[this.selectedNumberOfLine][index] = value;
          }

        }
      })

    }

  }
  /*loadLazy(event) {
    console.log("je suis dans l'event", event.first);*/

  /**
   * event.first est la position de la premiere ligne dans traces. Si elle vaut entre 10001 et 10029 alors il faut charger les nouvelles données 
   */
  /* if (((event.first)%10000)<30 &&((event.first)%10000)>0) {
     console.log("je dois requeter pour obtenir la page suivante")
     this.tranche++;
     this.getData.getJSON("between/" + this.minDate + "/" + this.maxDate + this.tranche).subscribe(res => {
       this.traces = res;

     }, err => {
       console.log("Erreur lors de la requete de lazy load");
     })
   }
 }*/

}







