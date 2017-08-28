import { Component, OnInit } from '@angular/core';

/**
 * ButtonModule: Bouton Go !
 * GrowlModule: Affichage du message d'erreur lors de mauvaise saisie des données
 * Message : Format utilisé par GrowlModule
 */
import { ButtonModule, GrowlModule, Message, SelectItem } from 'primeng/primeng';
import { GetDataService } from '../../../Services/get-data.service';
import { Router } from "@angular/router";

declare var $: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',

})


export class CalendarComponent implements OnInit {
  //result et resultCop sont les résultats récupérés lors d'un appel au service web distant 
  result: any[] = [];
  resultCop: any;
  minDateS: string;
  maxDateS: string;
  //contiendra les valeurs qui seront affichées par les 2 calendriers de sélection des dates d'intervalle 
  fr: any;
  dMin: Date;
  dMax: Date;


  slideValueDebut: any;
  slideValueFin: any;
  //permettra d'afficher une pop-up indiquant une information/erreur
  msgs: Message[] = [];
  sessionsOptions: SelectItem[] = [];
  totalRecords: any;

  columns: any[] = [];
  nbFilterLine: any[] = [];
  //c'est un tableau qui contient les données rentrées par l'utilisateur (hormis data) lors de la sélection des traces par attribut 
  lineAttributes: any[] = [];
  /* tableau qui contient les valeurs DATAS rentrées par l'utilisateur */
  tabDataAttributes: any[] = [];
  displayInfos: boolean = false;
  displayDataChoice: boolean = false;
  //permet d'afficher la fenetre de dialogue si la recherche des blocs doit se faire avec ou sans intervalle de temps
  displayBlocChoice: boolean = false;
  //permet de retenir la dernière ligne sélectionnée de l'utilisateur 
  lineSelected: any = 0;
  blocs: any;



  /** private obligatoire sinon erreur : does not exist on type CalendarComponent **/
  constructor(private getData: GetDataService, private router: Router) { }

  /*** Utilisé pour le message d'affichage d'erreur de saisie de valeur pour les millisecondes */
  show() {
    this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Veuillez rentrer 2 dates ainsi qu\'une valeur entre 0 et 999' });
  }


  /** Permet de personnaliser les valeurs affichées sur le calendrier  */
  ngOnInit() {
    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      dayNamesShort: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      dayNamesMin: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
      monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"],
      monthNamesShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Jui", "Aoû", "Sep", "Oct", "Nov", "Dec"]
    };

    /* servira pour la vue qui le mettra comme colonnes d'un tableeua */
    this.columns = [
      /*"Add/Remove duplicate line",*/ "Session ID", "Username", "RemoteAdress", "AgentName", "SoftwareName", "SoftwareRelease", "SoftwareVersion", /*"dataKey", "dataValue",*/"data",
      "Type", "ClassName", "MethodName", "Event", "Action", "ActionTarget", "ActionTargetClass", "ActionDetail"
    ]



    this.lineAttributes.push({
      sessionId: "", userName: "", remoteAdress: "", agentName: "", softwareName: "", softwareRelease: "", softwareVersion: "",
                          /*dataKey:"", dataValue:"",*/ type: "", className: "", methodName: "", event: "",
      action: "", actionTarget: "", actionTargetClass: "", actionDetail: ""
    });


    this.tabDataAttributes.push({ key: [], value: [], nbLines: [] });
    this.tabDataAttributes[0].key.push("");
    this.tabDataAttributes[0].value.push("");
    this.tabDataAttributes[0].nbLines.push(0);

    this.nbFilterLine.push(0);


  }

  /** Utilisé pour mettre à jour la date minimale afin que le calendrier de choix de fin d'intervalle ne puisse 
   * pas choisir un jour antérieur au jour sélectionné sur le premier calendrier 
   */
  Date(date: Date) {
    this.dMin = date;
  }

  /** Inverse de dessus, sont appelées dans la View  */
  setMaxDate(date: Date) {
    this.dMax = date;
  }
  setMinDate(date: Date) {
    this.dMin = date;
  }

  /*Fonction qui permet d'appeler le webservice et récupérer les traces comprises entre 2 dates */
  requestDatesBetween(minDate: string, maxDate: string) {
    /**
     * La vérification permet de mettre une valeur dans la ligne sessionId, afin de ne pas déséquilibrer l'affichage entre sessionId et le reste (car sessionId est affiché distinctement)
     */
    let present = [];
    this.getData.getJSON("between/" + minDate + "/" + maxDate + "/0/").subscribe(res => {
      console.log(res); if (res == -1) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Erreur', detail: "Le serveur a renvoyé un message d'erreur." });
      }
      else {
        this.totalRecords = res[0];
        this.result = res.slice(1, res.length);
        console.log("nombre total d'élements ", this.totalRecords);
        if (this.result.length == 100000) {
          this.msgs.push({ severity: 'info', summary: 'Performance', detail: 'Pour des raisons de performance, les données renvoyées sont limitées à 100 000. La dernière ligne date du ' + this.result[99999].timeStamp });

        }

        this.result.forEach(element => {
          if (element.sessionId == null) {
            element.sessionId = "Non défini"
          } if (element.userName == null) element.userName = "X"; if (element.remoteAdress == null) element.remoteAdress = "X"; if (element.softwareName == null) element.softwareName = "X"; if (element.softwareVersion == null) element.softwareVersion = "X"; if (element.timeStamp == null) element.timeStamp = "X"; if (element.className == null) element.className = "X"; if (element.event == null) element.event = "X"; if (element.action == null) element.action = "X"; if (element.actionTarget == null) element.actionTarget = "X"; if (element.actionTargetClass == null) element.actionTargetClass = "X"; if (element.actionDetail == null) element.actionDetail = "X"; if (element.methodName == null) element.methodName = "X"; if (element.agentName == null) element.agentName = "X"; if (element.data == null) element.data = "X"; if (element.type == null) element.type = "X"; if (element.softwareRelease == null) element.softwareRelease = "X";

        }),
          this.resultCop = this.result, console.log(this.result), this.result.forEach(element => {
            if (!present[element.sessionId]) {
              this.sessionsOptions.push({ label: element.sessionId, value: element.sessionId });
              present[element.sessionId] = 1;
            }
          }

          )
      }
    },

      err => { console.error(err + " Erreur lors de la récupération des données") },
      () => { console.log('Subscribing success') });


  }


  /** On click du bouton Go !, teste si les valeurs dans les input sont bonnes:
   * -Si oui, requête au serveur
   * -Si non, affichage du message d'erreur qui s'enlèvera lorsque l'input sera édité
   */
  onclick() {

    /** envoi de la requete rest au serveur  */
    console.log("clic détecté!");
    var regex = /^[0-9]*$/;

    if (this.dMin == null || this.dMax == null) {
      this.show();
    }



    //mettre juste la condition !this.slideValueDebut/Fin permet de vérifier qu'à la fois la valeur n'est pas nulle et qu'elle ne 
    //correspond pas à '' (dans le cas où on rentre une valeur et qu'on l'efface, les variables auront cette valeur)
    else if (!this.slideValueDebut && !this.slideValueFin)//if(this.slideValueDebut==null && this.slideValueFin==null)
    {
      console.log("les 2 slides values sont nuls");
      this.minDateS = `${this.dMin.getFullYear()}-${this.dMin.getMonth() + 1}-${this.dMin.getDate()} ${this.dMin.getHours() % 12}:${this.dMin.getMinutes()}:${this.dMin.getSeconds()}.0 ${this.dMin.getHours() > 12 ? "PM" : "AM"}`;
      this.maxDateS = `${this.dMax.getFullYear()}-${this.dMax.getMonth() + 1}-${this.dMax.getDate()} ${this.dMax.getHours() % 12}:${this.dMax.getMinutes()}:${this.dMax.getSeconds()}.0 ${this.dMax.getHours() > 12 ? "PM" : "AM"}`;
      this.requestDatesBetween(this.minDateS, this.maxDateS);

      /** Faire fonction de getJson paramétrée, l'appeler pour chaque test en settant les bonnes valeurs, pas besoin de callback dans un if else, car seul le premier sera exécuté */
    }
    else if (!this.slideValueDebut)//if (this.slideValueDebut==null)
    {
      console.log("slide value debut est nul");
      this.minDateS = `${this.dMin.getFullYear()}-${this.dMin.getMonth() + 1}-${this.dMin.getDate()} ${this.dMin.getHours() % 12}:${this.dMin.getMinutes()}:${this.dMin.getSeconds()}.0 ${this.dMin.getHours() > 12 ? "PM" : "AM"}`;
      this.requestDatesBetween(this.minDateS, this.maxDateS);

    }
    else if (!this.slideValueFin)//if(this.slideValueFin==null)
    {
      console.log("slide value fin est nul");
      this.maxDateS = `${this.dMax.getFullYear()}-${this.dMax.getMonth() + 1}-${this.dMax.getDate()} ${this.dMax.getHours() % 12}:${this.dMax.getMinutes()}:${this.dMax.getSeconds()}.0 ${this.dMax.getHours() > 12 ? "PM" : "AM"}`;
      this.requestDatesBetween(this.minDateS, this.maxDateS);


    }
    else if (this.slideValueDebut >= 0 && this.slideValueFin <= 999) //|| this.slideValueDebut.match(regex) ||this.slideValueFin.match(regex))
    {
      console.log("valueees : " + this.slideValueDebut + " " + this.slideValueFin);
      this.requestDatesBetween(this.minDateS, this.maxDateS);

    }
    else {
      console.log("Veuillez rentrer une valeur comprise entre 0 et 999.")
      this.show();
    }
  }

  /**  event utilisé lors de la sélection d'une date sur le calendrier de début d'intervalle. Il permet de formatter la date 
   * au format voulu (celui correspondant au timestamp des traces)
  */

  onSelectMethodMinDate(event) {
    this.msgs = [];
    this.dMin = new Date(Date.parse(event));
    //2017-04-04 01:57:18.925 PM
    this.minDateS = `${this.dMin.getFullYear()}-${this.dMin.getMonth() + 1}-${this.dMin.getDate()} ${this.dMin.getHours() % 12}:${this.dMin.getMinutes()}:${this.dMin.getSeconds()}.${this.slideValueDebut != null ? this.slideValueDebut : 0} ${this.dMin.getHours() > 12 ? "PM" : "AM"}`;
  }

  /**
   * idem que dessus mais pour le calendrier de gauche
   */
  onSelectMethodMaxDate(event) {
    this.msgs = [];
    this.dMax = new Date(Date.parse(event));
    //2017-04-04 01:57:18.925 PM
    this.maxDateS = `${this.dMax.getFullYear()}-${this.dMax.getMonth() + 1}-${this.dMax.getDate()} ${this.dMax.getHours() % 12}:${this.dMax.getMinutes()}:${this.dMax.getSeconds()}.${this.slideValueFin != null ? this.slideValueFin : 0} ${this.dMax.getHours() > 12 ? "PM" : "AM"}`;
  }

  /**
   * Permet de mettre à jour la valeur minDateS (valeur utilisée pour requete rest) quand la saisie dans l'input est un nombre
   */
  handleChangeMinDate() {
    /** Permet de désafficher la pop-up d'erreur s'il y en avait une, l'attribut life ne fonctionnant pas  */
    this.msgs = [];
    if (this.dMin != null) {
      var regex = /^[0-9]*$/;
      if (this.slideValueDebut.match(regex)) {

        this.minDateS = `${this.dMin.getFullYear()}-${this.dMin.getMonth() + 1}-${this.dMin.getDate()} ${this.dMin.getHours() % 12}:${this.dMin.getMinutes()}:${this.dMin.getSeconds()}.${this.slideValueDebut} ${this.dMin.getHours() > 12 ? "PM" : "AM"}`;
      }
      else {
        this.slideValueDebut = null;
        console.log("Vous devez saisir un nombre valide.");

      }
    }
  }
  /**
   * Permet de mettre à jour la valeur maxDateS (valeur utilisée pour requete rest) quand la saisie dans l'input est un nombre
   */
  handleChangeMaxDate() {
    /** Permet de désafficher la pop-up d'erreur s'il y en avait une, l'attribut life ne fonctionnant pas  */
    this.msgs = [];
    if (this.dMax != null) {
      var regex = /^[0-9]*$/;
      if (this.slideValueFin.match(regex)) {

        this.maxDateS = `${this.dMax.getFullYear()}-${this.dMax.getMonth() + 1}-${this.dMax.getDate()} ${this.dMax.getHours() % 12}:${this.dMax.getMinutes()}:${this.dMax.getSeconds()}.${this.slideValueFin} ${this.dMax.getHours() > 12 ? "PM" : "AM"}`;
      }
      else {
        //this.slideValueFin=null;
        console.log("Vous devez saisir un nombre valide.");

      }
    }
  }

  unlog() {
    this.getData.getJSON("unlog/").subscribe(res => {
      if (res == 1) {
        console.log("Déconnexion réussie");
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Déconnexion', detail: 'Déconnexion réussie !' });

        this.router.navigate(['loginPage']);

      }

    }, err => {
      console.log("Il y a eu une erreur lors de la déconnexion")
    })
  }

  addLine() {
    this.nbFilterLine.push(this.nbFilterLine[this.nbFilterLine.length - 1] + 1);
    this.lineAttributes.push({
      sessionId: "", userName: "", remoteAdress: "", agentName: "", softwareName: "", softwareRelease: "", softwareVersion: "",
                          /*dataKey:"", dataValue:"",*/ type: "", className: "", methodName: "", event: "",
      action: "", actionTarget: "", actionTargetClass: "", actionDetail: ""
    });
    this.tabDataAttributes.push({ key: [], value: [], nbLines: [] });
    this.tabDataAttributes[this.tabDataAttributes.length - 1].key.push("");
    this.tabDataAttributes[this.tabDataAttributes.length - 1].value.push("");
    this.tabDataAttributes[this.tabDataAttributes.length - 1].nbLines.push(0);
    console.log(this.nbFilterLine)
  }

  //le 1er ajout devra être à l'indice line+1, le 2nd line+2 etc
  addDuplicateLine(line: any) {

    var i = line + 1;
    while (i != this.lineAttributes.length && this.lineAttributes[i].duplicate == "true") {
      i++;
    }

    var lineAttDeb: any[] = this.lineAttributes.slice(0, i);
    var lineAttFin: any[] = this.lineAttributes.slice(i, this.lineAttributes.length);
    console.log(lineAttDeb, lineAttFin);

    this.nbFilterLine.push(this.nbFilterLine[this.nbFilterLine.length - 1] + 1);
    lineAttDeb.push({
      duplicate: "true", sessionId: lineAttDeb[lineAttDeb.length - 1].sessionId, userName: lineAttDeb[lineAttDeb.length - 1].userName, remoteAdress: lineAttDeb[lineAttDeb.length - 1].remoteAdress, agentName: lineAttDeb[lineAttDeb.length - 1].agentName, softwareName: lineAttDeb[lineAttDeb.length - 1].softwareName, softwareRelease: lineAttDeb[lineAttDeb.length - 1].softwareRelease, softwareVersion: lineAttDeb[lineAttDeb.length - 1].softwareVersion,
      type: lineAttDeb[lineAttDeb.length - 1].type, className: lineAttDeb[lineAttDeb.length - 1].className, methodName: lineAttDeb[lineAttDeb.length - 1].methodName, event: lineAttDeb[lineAttDeb.length - 1].event,
      action: lineAttDeb[lineAttDeb.length - 1].action, actionTarget: lineAttDeb[lineAttDeb.length - 1].actionTarget, actionTargetClass: lineAttDeb[lineAttDeb.length - 1].actionTargetClass, actionDetail: lineAttDeb[lineAttDeb.length - 1].actionDetail
    })
    //PUSHER LA LIGNE d'avant push une référence!
    //lineAttDeb.push(lineAttDeb[lineAttDeb.length-1]);

    this.lineAttributes = lineAttDeb.concat(lineAttFin);
    console.log("lineAttributes :", this.lineAttributes);

    var tabLineAttDeb: any[] = this.tabDataAttributes.slice(0, i);
    var tabLineAttFin: any[] = this.tabDataAttributes.slice(i, this.tabDataAttributes.length);
    tabLineAttDeb.push({ key: [], value: [], nbLines: [] });
    //AJOUTER LES VALEURS DE DATA DE LA LIGNE D'AVANT 

    for (let i = 0; i < tabLineAttDeb[tabLineAttDeb.length - 2].key.length; i++) {
      console.log("je suis dans la boucle");
      tabLineAttDeb[tabLineAttDeb.length - 1].key.push(tabLineAttDeb[tabLineAttDeb.length - 2].key[i])
      tabLineAttDeb[tabLineAttDeb.length - 1].value.push(tabLineAttDeb[tabLineAttDeb.length - 2].value[i])
      tabLineAttDeb[tabLineAttDeb.length - 1].nbLines.push(tabLineAttDeb[tabLineAttDeb.length - 2].nbLines[i])
      console.log("valeur de tabLineAttDeb", tabLineAttDeb)

    }


    this.tabDataAttributes = tabLineAttDeb.concat(tabLineAttFin);

  }

  removeLine() {
    if (this.nbFilterLine.length > 1) {

      this.nbFilterLine.pop();
      this.lineAttributes.pop();
      this.tabDataAttributes.pop();
      if (this.lineSelected > 0)
        this.lineSelected--;

    }
  }

  /*la valeur de line sera celle de la ligne "mère", il faudra donc chercher le dernier element tel que duplicate==true
  *Premier if, on vérifie que la taille du tableau >1 sinon comparaison suivante renvoie exception.
  *Pour le meme but, on vérifie que line != tab.length-1, et ensuite on ne rentre dans la boucle que si au moins la ligne suivant est dupliquée sinon ca ne sert à rien 
  */
  removeDuplicateLine(line: any) {
    if (this.nbFilterLine.length > 1 && line != this.nbFilterLine.length - 1 && this.lineAttributes[line + 1].duplicate == "true") {

      this.nbFilterLine.pop();
      //quand on supprime une ligne dupliquée, on doit également supprimer les datas 
      /*this.tabDataAttributes[this.lineSelected].key.pop();
      this.tabDataAttributes[this.lineSelected].value.pop();
      this.tabDataAttributes[this.lineSelected].nbLines.pop();*/

      var i = line + 1;
      while (i != this.lineAttributes.length && this.lineAttributes[i].duplicate == "true") {
        i++;
      }
      if (i - 1 != line) {

        var lineAttDeb = this.lineAttributes.slice(0, i);
        var lineAttFin = this.lineAttributes.slice(i, this.lineAttributes.length);

        lineAttDeb.pop();

        this.lineAttributes = lineAttDeb.concat(lineAttFin);

        var tabLineAttDeb = this.tabDataAttributes.slice(0, i);
        var tabLineAttFin = this.tabDataAttributes.slice(i, this.tabDataAttributes.length);
        tabLineAttDeb.pop();

        this.tabDataAttributes = tabLineAttDeb.concat(tabLineAttFin);
        if (this.lineSelected > 0)
          this.lineSelected--;

      }
    }
  }

  displayTab() {
    console.log("valeur du tableau: ", this.lineAttributes);


  }

  //fonction appelée lors d'un click sur "rechercher les blocs correspondants", pour afficher la fenetre de dialogue
  //permettant de choisir avec ou sans intervalle de temps
  displayWithOrWithout() {
    this.displayBlocChoice = true;
  }

  attributesSearch() {

    //le mettre à faux permet à la fenetre de dialogue de se fermer automatiquement
    this.displayBlocChoice = false;
    let empty: any = false;
    let duplicateAttribute: any = false;

    for (let i = 0; i < this.tabDataAttributes.length; i++) {



      let index = 0;
      this.lineAttributes[i].data = {};
      $.each(this.tabDataAttributes[i].key, (index, value) => {

        if (value.trim() == "") {
          value = "UNKNOWN_KEY_BLL" + 0;
          let j = 0;
          $.each(this.lineAttributes[i].data, (index2, value2) => {
            if (index2 == value) {
              j++;
              value = "UNKNOWN_KEY_BLL" + j;
            }
          })
        }
        console.log("valeur de index", index, "valeur de value", value)
        this.lineAttributes[i]["data"][value] = this.tabDataAttributes[i].value[index].trim();
        index++;
        console.log("valeur de lineAttributes après insertion de data ", this.lineAttributes)

        if (this.allEmpty(i)) {
          console.log("une ligne est vide, erreur, arret de la methode ");
          empty = true;

        }

      });

    }
    if (empty == true) {
      return;
    }
    else {
      var jsonValue = JSON.stringify(this.lineAttributes);
      console.log("valeur du json: ", jsonValue);
      //on fait maintenant appel au web service 
      this.msgs/*AttributesSearch*/.push({ severity: 'info', summary: 'Recherche en cours', detail: "La recherche des blocs est en cours..." });

      this.getData.getJSON("selection/" + jsonValue + "/").subscribe(res => {
        console.log("valeur de la reponse recue :", res);
        this.blocs = res;
        this.blocs.forEach(element => {
          if (element.sessionId == null) {
            element.sessionId = "Non défini"
          } if (element.userName == null) element.userName = "X"; if (element.remoteAdress == null) element.remoteAdress = "X"; if (element.softwareName == null) element.softwareName = "X"; if (element.softwareVersion == null) element.softwareVersion = "X"; if (element.timeStamp == null) element.timeStamp = "X"; if (element.className == null) element.className = "X"; if (element.event == null) element.event = "X"; if (element.action == null) element.action = "X"; if (element.actionTarget == null) element.actionTarget = "X"; if (element.actionTargetClass == null) element.actionTargetClass = "X"; if (element.actionDetail == null) element.actionDetail = "X"; if (element.methodName == null) element.methodName = "X"; if (element.agentName == null) element.agentName = "X"; if (element.data == null) element.data = "X"; if (element.type == null) element.type = "X"; if (element.softwareRelease == null) element.softwareRelease = "X";

        })
        // this.msgsAttributesSearch=[];
        this.msgs.pop();
        this.msgs/*AttributesSearch*/.push({ severity: 'success', summary: 'Résultat', detail: res.length + " résultats trouvés !" });

      }, err => {
        console.log("il y a eu une erreur lors de l'envoi des données " + err);
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Attention', detail: "Le serveur a renvoyé une erreur (inspecter console pour détails)" });


      });
    }
  }

  attributesSearchWithDates() {
    //le mettre à faux permet à la fenetre de dialogue de se fermer automatiquement
    this.displayBlocChoice = false;
    let empty: any = false;
    let duplicateAttribute: any = false;

    for (let i = 0; i < this.tabDataAttributes.length; i++) {



      let index = 0;
      this.lineAttributes[i].data = {};
      $.each(this.tabDataAttributes[i].key, (index, value) => {

        if (value.trim() == "") {
          value = "UNKNOWN_KEY_BLL" + 0;
          let j = 0;
          $.each(this.lineAttributes[i].data, (index2, value2) => {
            if (index2 == value) {
              j++;
              value = "UNKNOWN_KEY_BLL" + j;
            }
          })
        }
        console.log("valeur de index", index, "valeur de value", value)
        this.lineAttributes[i]["data"][value] = this.tabDataAttributes[i].value[index].trim();
        index++;
        console.log("valeur de lineAttributes après insertion de data ", this.lineAttributes)

        if (this.allEmpty(i)) {
          console.log("une ligne est vide, erreur, arret de la methode ");
          empty = true;

        }

      });

    }
    if (empty == true) {
      return;
    }
    else {
      var jsonValue = JSON.stringify(this.lineAttributes);
      console.log("valeur du json: ", jsonValue);
      //on fait maintenant appel au web service 
      if (!this.minDateS || !this.maxDateS) {
        this.msgs/*AttributesSearch*/.push({ severity: 'error', summary: 'Valeurs manquantes', detail: "Il manque au moins une date." });
      }
      else {
        this.msgs/*AttributesSearch*/.push({ severity: 'info', summary: 'Recherche en cours', detail: "La recherche des blocs est en cours..." });

        this.getData.getJSON("selection/" + jsonValue + "/" + this.minDateS + "/" + this.maxDateS + "/").subscribe(res => {
          console.log("valeur de la reponse recue :", res);
          this.blocs = res;
          this.blocs.forEach(element => {
            if (element.sessionId == null) {
              element.sessionId = "Non défini"
            } if (element.userName == null) element.userName = "X"; if (element.remoteAdress == null) element.remoteAdress = "X"; if (element.softwareName == null) element.softwareName = "X"; if (element.softwareVersion == null) element.softwareVersion = "X"; if (element.timeStamp == null) element.timeStamp = "X"; if (element.className == null) element.className = "X"; if (element.event == null) element.event = "X"; if (element.action == null) element.action = "X"; if (element.actionTarget == null) element.actionTarget = "X"; if (element.actionTargetClass == null) element.actionTargetClass = "X"; if (element.actionDetail == null) element.actionDetail = "X"; if (element.methodName == null) element.methodName = "X"; if (element.agentName == null) element.agentName = "X"; if (element.data == null) element.data = "X"; if (element.type == null) element.type = "X"; if (element.softwareRelease == null) element.softwareRelease = "X";

          })
          // this.msgsAttributesSearch=[];
          this.msgs.pop();
          this.msgs/*AttributesSearch*/.push({ severity: 'success', summary: 'Résultat', detail: res.length + " résultats trouvés !" });

        }, err => {
          console.log("il y a eu une erreur lors de l'envoi des données " + err);
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Attention', detail: "Le serveur a renvoyé une erreur (inspecter console pour détails)" });


        });
      }
    }
  }




  infos() {
    this.displayInfos = true;
  }

  addData() {
    this.tabDataAttributes[this.lineSelected].nbLines.push(this.tabDataAttributes[this.lineSelected].nbLines.length);//[this.tabDataAttributes[this.lineSelected].nbLines.length -1]+1);
    //this.nbDataChosen.push(this.nbDataChosen[this.nbDataChosen.length - 1] + 1);
    // this.dataAttributes.push({key:"", value:""});
    this.tabDataAttributes[this.lineSelected].key.push("");
    //this.dataAttributes.value.push("");
    this.tabDataAttributes[this.lineSelected].value.push("");
  }

  removeData() {
    if (this.tabDataAttributes[this.lineSelected].nbLines.length > 1) {

      this.tabDataAttributes[this.lineSelected].nbLines.pop();
      //this.dataAttributes.pop();
      this.tabDataAttributes[this.lineSelected].key.pop();
      this.tabDataAttributes[this.lineSelected].value.pop();
      console.log("je suis rentré dans la condition")
      console.log("valeur de tabDataAttributes :", this.tabDataAttributes)
      console.log("valeur de la ligne sélectionnée ", this.lineSelected)
    }
  }
  openSelectionDataDialog(line: any) {
    this.lineSelected = line;
    console.log("valeur de la ligne sélectionnée ", this.lineSelected)
    this.displayDataChoice = true;
  }

  displayTabData() {
    console.log("datas :", this.tabDataAttributes)
  }

  allEmpty(indice: any) {
    /** 
     * hasOwnProperty permet de vérifier que property est bien un attribut créé par l'utilisateur et non des propriétés héritées par la classe Object de base
     * OR for(var property in this.lineAttributes[indice])
     * {
     *  if(object.hasOwnProperty(property))
     * {
     * do something
     * }
     * }
     */
    let empty: any = true;
    let emptyData: any = true;
    let size: any = 0;
    let indexData :any=0;
    $.each(this.lineAttributes[indice], (index, value) => {

      if (index == "data") {
        size = Object.keys(this.lineAttributes[indice][index]).length;
        $.each(this.lineAttributes[indice][index], (index2, value2) => {
         
          console.log("allempty index2", index2, "allempty value2", value2)
          if ((index2 != "" || value2 != "")) {
            if ((index2.substring(0, 15) == "UNKNOWN_KEY_BLL") && (value2 == "")) {
              console.log("valeur de size ", size)
              if (size > 1) {
                console.log("iciiiiiii")
                emptyData = true;
              }
              return;
            }

            
            empty = false;
            emptyData = false;

          }
          //dans le cas où on ait une ligne vide suivie d'une autre ligne
          else if(index2 == "" || value2 == "")
            {
              if(indexData<size-1)
                {
                  emptyData=true;
                }
            }
            indexData++;
        })
      }
      else {
        if (index != "duplicate" && value != "") {
          console.log("itération dans allEmpty")
          empty = false;
        }
      }
    })
    if (empty == true && emptyData == true) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Il y a une ligne sans attributs (possiblement dans data). Veuillez la remplir ou la supprimer.' });

    }
    else if (empty == false && emptyData == true) {
      if (size > 1) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Veuillez supprimer les lignes vides de data avant de lancer la requête.' });
        return true;
      }
      else return false;
    }

    console.log("empty", empty, "emptyData", emptyData, " empty && emptyData", empty && emptyData)
    return empty && emptyData;
  }

  drop_Database() {
    this.router.navigate(['dropDB']);
  }

}
