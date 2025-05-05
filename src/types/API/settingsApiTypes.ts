export type ModuleConfigItem = {
  Key: string;
  Ismobileshow: boolean;
  Iswebshow: boolean;
  Displayname: string;
};

export type ModuleConfig = {
  id: number;
  tenantId: number;
  showroomId: number;
  moduleKey: string;
  config: ModuleConfigItem[];
};
