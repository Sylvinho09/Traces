import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { GetDataService } from '../../../Services/get-data.service';
import { Router } from "@angular/router";
import { Message } from "primeng/primeng";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  msgs: Message[] = [];


  constructor(private getData: GetDataService, private router: Router) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    if (f.value.id.trim() == "" || f.value.password.trim() == "") {
      this.msgs = []
      this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Veuillez remplir tous les champs.' });

    }

else
{
    this.getData.getJSON("login/" + f.value.id.trim() + "/" + f.value.password.trim() + "/").subscribe(res => {
      if (res == -1) {
        this.msgs = []
        this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Votre mot de passe est incorrect.' });

      }
      else if (res == 1) {
        this.router.navigate(['Analyzer']);
      }
      else if (res == -2) {
        this.msgs = []
        this.msgs.push({ severity: 'error', summary: 'Attention', detail: 'Aucun compte n\'est associé à cet identifiant.' });

      }
    }, err => {
        console.log("Une erreur est survenue ! ", err)
      })
  }
  }

}
