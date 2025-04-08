import { ModuleType } from "../enums";
import { WebPackModule } from "../models";

export class WebPackModuleMock {
  static genList(count: number): WebPackModule[] {
    const modules: WebPackModule[] = [];

    for (let i = 1; i <= count; i++) {
      modules.push({
        id: `${i}`,
        routePath: `module${i}`,
        remoteEntry: `https://www.module${i}.com/remoteEntry.json`,
        remoteName: `module${i}`,
        exposedModule: `./Module${i}`,
        owner: "shell",
        moduleName: `Module${i}`,
        type: "ROUTE" as ModuleType,
        createdDate: '2024-05-30T03:00:00.000Z',
        lastModifiedDate: '2024-05-30T03:00:00.000Z',
        data: Object({})
      })
    }

    return modules;
  }

  static genOne(id: number, type: ModuleType = "ROUTE"): WebPackModule {
    return {
      id: `${id}`,
      routePath: `module${id}`,
      remoteEntry: `https://www.module${id}.com/remoteEntry.json`,
      remoteName: `module${id}`,
      exposedModule: `./Module${id}`,
      owner: "shell",
      moduleName: `Module${id}`,
      type,
      createdDate: '2024-05-30T03:00:00.000Z',
      lastModifiedDate: '2024-05-30T03:00:00.000Z',
      data: Object({})
    }
  }

  static genPatch(id: number): Partial<WebPackModule> {
    return {
      id: `${id}`,
      remoteEntry: `https://www.patch${id}.com/remoteEntry.json`
    }
  }
}
