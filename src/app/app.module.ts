import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GetDataService} from '../Services/get-data.service';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './Vues/calendar/calendar.component';
/**
 * CalendarModule: Calendrier de sélection des dates
 * GrowlModule: Message d'erreur lors de saisie de dates
 * SliderModule: bouton de slide pour choix des millisecondes //plus utilisé
 * SharedModule:
 * OrderListModule: Affichage des traces avec filtrage
 * DataTableModule: Affichage des traces avancé
 * DropDownModule, MultiSelectModule: Utilisé dans le DataTableModule pour la sélection des filtres
 */
import {CalendarModule, GrowlModule, SliderModule, SharedModule, OrderListModule, DataTableModule,DropdownModule,MultiSelectModule, DialogModule,ListboxModule, FileUploadModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { SanitizeHtmlPipePipe } from './Pipes/sanitize-html-pipe.pipe';
import { OrderableTabComponent } from './Vues/calendar/Vues-Calendar/orderable-tab/orderable-tab.component';
import { FilterTableComponent } from './Vues/calendar/Vues-Calendar/filter-table/filter-table.component';
import { ToggleTabComponent } from './Vues/calendar/Vues-Calendar/toggle-tab/toggle-tab.component';
import { routing, appRoutingProviders }  from './app.routing';
import { LoginPageComponent } from './Vues/login-page/login-page.component';
import { UploadFileComponent } from './Vues/calendar/Vues-Calendar/upload-file/upload-file.component';




@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SanitizeHtmlPipePipe,
    OrderableTabComponent,
    FilterTableComponent,
    ToggleTabComponent,
    LoginPageComponent,
    UploadFileComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    SharedModule,
    SliderModule,
    GrowlModule,
    OrderListModule,
    DataTableModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    ListboxModule,
    FileUploadModule,
    //ne pas mettre routing cause l'erreur: "no provider for rooter !"
    routing,
    
    
    
  
  ],
  providers: [GetDataService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
