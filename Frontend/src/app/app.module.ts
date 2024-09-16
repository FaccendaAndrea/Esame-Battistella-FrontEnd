import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TodocomponentComponent } from "./pages/todocomponent/todocomponent.component";
import { TodosingoloComponent } from "./components/todosingolo/todosingolo.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { NavUserComponent } from "./components/nav-user/nav-user.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthInterceptor } from "./utils/auth.interceptor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        AppComponent,
        TodocomponentComponent, 
        TodosingoloComponent,
        NavUserComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgbModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule { }
