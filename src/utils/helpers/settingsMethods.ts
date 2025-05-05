import {ModuleConfig, ModuleConfigItem} from '../../types/API/settingsApiTypes';

export type DataItem = {
  Key: string;
  Iswebshow: boolean;
  Displayname: string;
  Ismobileshow: boolean;
};

export type OutputGroup = {
  header: DataItem;
  fields: DataItem[];
};

export function transformInputData(inputData: DataItem[]): OutputGroup[] {
  const output: OutputGroup[] = [];
  let currentGroup: OutputGroup | null = null;

  inputData.forEach(item => {
    if (item.Key.endsWith('.heading')) {
      // Start a new group
      currentGroup = {
        header: item,
        fields: [],
      };
      output.push(currentGroup);
    } else if (currentGroup) {
      // Add to the current group's fields
      currentGroup.fields.push(item);
    }
  });

  return output;
}
/*
let inputData = [
  {
    Key: "party.heading",
    Iswebshow: false,
    Displayname: "Party Details",
    Ismobileshow: true,
  },
  {
    Key: "party.name",
    Iswebshow: false,
    Displayname: "Party Name",
    Ismobileshow: true,
  },
  {
    Key: "party.date",
    Iswebshow: false,
    Displayname: "Party Date",
    Ismobileshow: true,
  },
  {
    Key: "vehicle.heading",
    Iswebshow: false,
    Displayname: "Vehicle Details",
    Ismobileshow: true,
  },
  {
    Key: "vehicle.amount",
    Iswebshow: false,
    Displayname: "Amount",
    Ismobileshow: true,
  },
  {
    Key: "vehicle.year",
    Iswebshow: false,
    Displayname: "Vehicle Year",
    Ismobileshow: true,
  },
  {
    Key: "approvalStatus.heading",
    Iswebshow: false,
    Displayname: "Approval Status",
    Ismobileshow: true,
  },
  {
    Key: "approvalStatus.ApprovalStatus",
    Iswebshow: false,
    Displayname: "Approval Status",
    Ismobileshow: true,
  },
];
let outputData = [
  {
    header: {
      Key: "party.heading",
      Iswebshow: false,
      Displayname: "Party Details",
      Ismobileshow: true,
    },
    fields: [
      {
        Key: "party.name",
        Iswebshow: false,
        Displayname: "Party Name",
        Ismobileshow: true,
      },
      {
        Key: "party.date",
        Iswebshow: false,
        Displayname: "Party Date",
        Ismobileshow: true,
      },
    ],
  },
  {
    header: {
      Key: "vehicle.heading",
      Iswebshow: false,
      Displayname: "Vehicle Details",
      Ismobileshow: true,
    },
    fields: [
      {
        Key: "vehicle.amount",
        Iswebshow: false,
        Displayname: "Amount",
        Ismobileshow: true,
      },
      {
        Key: "vehicle.year",
        Iswebshow: false,
        Displayname: "Vehicle Year",
        Ismobileshow: true,
      },
    ],
  },
  {
    header: {
      Key: "approvalStatus.heading",
      Iswebshow: false,
      Displayname: "Approval Status",
      Ismobileshow: true,
    },
    fields: [
      {
        Key: "approvalStatus.ApprovalStatus",
        Iswebshow: false,
        Displayname: "Approval Status",
        Ismobileshow: true,
      },
    ],
  },
];
*/

export const ShowField = (key: string, Data: ModuleConfigItem[]): boolean =>
  Array.isArray(Data) &&
  Data.some(item => item.Key === key && item.Ismobileshow === true);
