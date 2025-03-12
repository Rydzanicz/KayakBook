import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyComponent} from './body/body.component';
import {AboutComponent} from './about/about.component';
import {TermsComponent} from './terms/terms.component';
import {ContactComponent} from './contact/contact.component';
import {TraceComponent} from './trace/trace.component';
import {KajakComponent} from './kajak/kajak.component';
import {SummaryComponent} from './summary/summary.component';
import {AdminComponent} from './admin/admin.component';
import {TransactionDetailsComponent} from './admin/transaction-details/transaction-details.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/AuthGuard';

export const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'transaction/:id', component: TransactionDetailsComponent, canActivate: [AuthGuard]},
  {path: 'terms', component: TermsComponent},
  {path: 'trace/:id', component: TraceComponent},
  {path: 'kajak/:id/:hour', component: KajakComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
