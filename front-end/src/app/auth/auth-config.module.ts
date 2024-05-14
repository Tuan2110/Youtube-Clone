import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { AppSettings } from '../../config/AppSettings';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-5yn0dn4vqebdfbhw.us.auth0.com',
            redirectUrl: `${AppSettings.RETURN_URL}`,
            clientId: '5pVT5dZUZSvo9zCZXmLr5WDFx4YP7fIE',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes : [`${AppSettings.API_BASE_URL}`],
            customParamsAuthRequest: {
                audience: `${AppSettings.API_BASE_URL}`,
            },
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
