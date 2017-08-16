import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginPageComponent } from "./Vues/login-page/login-page.component";
import { CalendarComponent } from "./Vues/calendar/calendar.component";

const appRoutes: Routes = [
  { path: 'Analyzer',component: CalendarComponent },
  { path: 'loginPage', component: LoginPageComponent }


];
 
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);