import {NgModule} from '@angular/core';
import {provideRouter} from '@angular/router';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app.routes';
import {HttpClientModule} from '@angular/common/http';
import {TrainingComponent} from './training/training.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AboutComponent,
    ContactComponent,
    AppComponent,
    FooterComponent,
    TrainingComponent,
    HttpClientModule
  ],
  providers: [],
})
export class AppModule {
  static bootstrap() {
    return bootstrapApplication(AppComponent, {
      providers: [provideRouter([])]
    });
  }
}
