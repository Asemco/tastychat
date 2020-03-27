import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyAngularMaterialModule } from "../assets/MyAngularMaterialModule";
import { UserComponent } from './user/user.component';
import { ChatappComponent } from './chatapp/chatapp.component';
import { HttpAuthInterceptor } from './core/interceptors/httpAuth.interceptor';
import { FormComponent } from './form/form.component';
import { FormlistComponent } from './formlist/formlist.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatappComponent,
    FormComponent,
    FormlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MyAngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
