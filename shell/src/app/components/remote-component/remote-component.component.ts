import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef
} from '@angular/core';
import { LoadModulesService } from '../../services/load-modules.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NativeFederationService } from '../../services/native-federation.service';

@Component({
  selector: 'app-remote-component',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteComponentComponent implements OnInit {
  @Input({ required: true })
  remoteName!: string;

  constructor(
    private loadModulesService: LoadModulesService,
    private route: ActivatedRoute,
    public viewContainerRef: ViewContainerRef
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.remoteName) {
      const data = await firstValueFrom(this.route.data);
      this.remoteName = data['remoteName'];
    }

    await this.loadModule();
  }

  async loadModule(): Promise<void> {
    const webpackModule = this.loadModulesService.webPackModules
      .find(module => module.remoteName === this.remoteName);

    if (!webpackModule) {
      throw new Error(`Remote Component ${this.remoteName} not found`);
    }

    const { remoteName, remoteEntry, exposedModule, moduleName } = webpackModule;

    const remoteModule = await NativeFederationService
      .loadRemoteModule({ remoteName, remoteEntry, exposedModule });

    this.viewContainerRef.createComponent(remoteModule[moduleName]);
  }
}
