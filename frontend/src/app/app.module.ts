import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SiteDetailsComponent } from './pages/site-details/site-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GBPipe } from './gb.pipe';

@NgModule({
  declarations: [AppComponent, SidebarComponent, SiteDetailsComponent, GBPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
