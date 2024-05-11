import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpRequestInterceptor,
      multi:true
    },
    provideAnimationsAsync(),
    importProvidersFrom(
      
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem(`tkn_${environment.app}`)
          },
          // allowedDomains: ['localhost:4200'],
        },
      }),
      ),
      provideHttpClient(withInterceptorsFromDi()),
  ],
};
