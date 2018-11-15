import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { Observable } from 'rxjs';

class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({
      setHeaders: {
        'x-foo': 'bar',
      }
    });

    return next.handle(clonedReq);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
