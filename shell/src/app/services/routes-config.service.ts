import { Injectable } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { LoadModulesService } from './load-modules.service';
import { AppComponent } from '../app.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { WebPackModule } from '../models';
import { LoadingModuleGuard } from '../guards/loading-module.guard';
import { NativeFederationService } from './native-federation.service';


@Injectable({
  providedIn: 'root',
})
export class RoutesConfigService {
  constructor(
    private readonly loadModulesService: LoadModulesService,
    private readonly router: Router
  ) {}

  async configureRoutes() {
    try {
      const webpackModules = await this.loadModulesService.loadWebpackModules();
      console.debug('Webpack Modules:', webpackModules);

      const routeModules = webpackModules.filter(
        (module) => module.type === 'ROUTE'
      );

      const hasRouteModules = routeModules.length > 0;

      const modules = hasRouteModules
        ? routeModules.map(this.toRoutes).concat([
            {
              path: '',
              component: AppComponent,
            },
          ])
        : [
            {
              path: '',
              component: PageNotFoundComponent,
            },
          ];

      const routes: Routes = [
        {
          path: '',
          redirectTo: '/blue',
          pathMatch: 'full',
        },
        {
          path: '',
          children: modules,
        },
        {
          path: '**',
          component: PageNotFoundComponent,
        },
      ];

      console.debug('Routes configuradas:', routes);

      this.router.resetConfig(routes);
    } catch (error) {
      console.error('Erro ao configurar rotas:', error);
    }
  }

  toRoutes(webpackModule: WebPackModule): Route {
    const route: Route = {
      path: webpackModule.routePath,
      canLoad: [LoadingModuleGuard],
      canActivate: [LoadingModuleGuard],
      loadChildren: async () => {
        return NativeFederationService.loadRemoteModule({
          remoteName: webpackModule.remoteName,
          exposedModule: webpackModule.exposedModule,
          remoteEntry: webpackModule.remoteEntry,
        })
          .then((mod: { [x: string]: any }) => mod[webpackModule.moduleName])
          .catch(async (err: any) => {
            console.error('An error occurred while loading the module', err);
            return import(
              '../components/module-fail/module-fail.module'
            ).then((m) => m.ModuleFailModule);
          });
      },
      data: webpackModule.data,
    };

    return route;
  }
}
