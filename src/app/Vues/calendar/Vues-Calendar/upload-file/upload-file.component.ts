import { Component, OnInit } from '@angular/core';
import { FileUploadModule, Message } from 'primeng/primeng';
import { GetDataService } from "Services/get-data.service";



@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  msgsInfo: Message[] = [];
  msgsSuccess: Message[] = [];



  constructor(private getData: GetDataService) { }

  ngOnInit() {
    /**
     * Pout binder au context de UploadFileComponent pour pouvoir utiliser la méthode checkFileName with this
     */
    document.getElementById('file-input')
      .addEventListener('change', this.readSingleFile.bind(this), false);

  }



  readSingleFile(e) {
    var file = e.target.files[0];
    console.log("e: ", e, "file:", file);
    console.log("valeur de this :", this)
    if (!file || !this.CheckFileName(file.name)) {
      console.log("Je suis bien rentré dans la condition, le format est faux.")
      return;
    }
    else if (file.size > 200000000) {
      this.msgsInfo = [];
      this.msgsInfo.push({ severity: 'info', summary: 'Overflow', detail: "Un fichier trop volumineux peut causer des erreurs sur certains navigateurs... Limitez les fichiers à 200Mo." });
      return;
    }

    var reader = new FileReader();
    reader.onload = () => {


      var contents = reader.result.trim();




      var value:any[] = contents.toString().split("\n");
      this.msgsInfo.push({ severity: 'info', summary: 'Upload', detail: "Envoi de "+value.length+" lignes vers le WebService." });

      var stringJsonArray = '[' +value.join(',')+']';
      var jsonArray= JSON.parse(stringJsonArray);

   /*var firstLine= value[0];
      var jsonLine= JSON.parse(firstLine);
console.log("valeur de firstLine", firstLine);
console.log("valeur de jsonLine", jsonLine)
      var twoLines='['+value[0]+","+value[1]+']';
      console.log("valeur de twoLines", twoLines);
      var jsonTwoLines= JSON.parse(twoLines);
      console.log("valeur de jsonTwoLines", jsonTwoLines);*/

/*  
var firstline2='['+"{\"softwareName\":\"170403.1226\",\"softwareRelease\":null,\"softwareVersion\":\"2017.2-SNAPSHOT\",\"userName\":\"ADMIN\",\"sessionId\":\"8B1FB241B93FFCF661F8B65CC28382AA\",\"remoteAdress\":\"10.32.100.20\",\"event\":\"ON_CLICK\",\"action\":\"VALIDATE\",\"actionTarget\":\"POPUP\",\"actionTargetClass\":\"fr.bl.client.core.refui.base.dialogbox.impl.BLMsgBox\",\"actionDetail\":\"click on yes button\",\"data\":{\"text\":\"Oui\"},\"timeStamp\":\"2017-04-03 04:24:06.517 PM\"}"+']';
      var jsonLine2= JSON.parse(firstline2);*/


      /*
      * le .trim permet d'annuler le dernier \n fait lors de l'ajout de la derniere ligne, et permet donc de ne pas ajouter la virgule
      apres le dernier element quand on split par \n !
      le .split('\n') renvoie un tableau avec avec \n comme délimiteur
      le .join(',') concatène chaque élément du tableau est les sépare par une virgule
      JSON.parse parse le string en json
      */


      console.log("j'ai fini de transormer en json, je l'envoie au service web.");
      this.getData.postJSON(jsonArray).subscribe(res => {
        console.log("valeur de la reponse recue : ", res);
        if (res.status == 200) {
          console.log("les données ont bien été envoyées !");
          this.msgsInfo = [];
          this.msgsSuccess = [];
          this.msgsSuccess.push({ severity: 'success', summary: 'Upload', detail: 'Upload réussi !' });

        }
        else console.log("erreur lors de l'envoi des données json au service");
      });


    };
    reader.readAsText(file);
  }



  CheckFileName(fileName) {
    console.log("je suis bien rentré dans checkfilename")
    if (fileName == "") {
      alert("Veuillez rentrer un fichier au format JSON");
      return false;
    }
    else if (fileName.split(".")[1].toUpperCase() == "JSON" || fileName.split(".")[1].toUpperCase() == "LOG")
      return true;
    else {
      alert("Les fichiers avec l'extension " + fileName.split(".")[1] + " ne sont pas acceptés. Veuillez rentrer un JSON valide.");
      return false;
    }

  }

}
