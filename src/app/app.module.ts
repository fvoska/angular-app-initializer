import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { Observable } from 'rxjs';
import { MyPokemonService } from './services/pokemon/my-pokemon.service';

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

const myPokemonInit = (mypks: MyPokemonService) => {
  return () => mypks.init();
};

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
    },
    {
      provide: APP_INITIALIZER,
      deps: [MyPokemonService],
      multi: true,
      useFactory: myPokemonInit,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
