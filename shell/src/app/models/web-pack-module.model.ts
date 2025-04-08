import { ModuleType } from "../enums";

export interface WebPackModule {
  id: string;
  routePath: string;
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
  owner: string;
  moduleName: string;
  type: ModuleType;
  createdDate: string;
  lastModifiedDate: string;
  data: Map<string, string>;
}

export const REQUIRED_KEYS_WEBPACK_MODULE: Array<keyof WebPackModule> = [
  "id",
  "remoteEntry",
  "remoteName",
  "exposedModule",
  "moduleName",
  "type",
  "data"
]