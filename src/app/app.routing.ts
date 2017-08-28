import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginPageComponent } from "./Vues/login-page/login-page.component";
import { CalendarComponent } from "./Vues/calendar/calendar.component";
import {DropDBComponent} from "./Vues/calendar/Vues-Calendar/drop-db/drop-db.component"

const appRoutes: Routes = [
  { path: 'Analyzer',component: CalendarComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'dropDB', component : DropDBComponent}


];
 
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);