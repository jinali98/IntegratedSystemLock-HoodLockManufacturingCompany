import { InvenotryUnit } from "../model/inventoryUnit/inventoryUnit";

export const materialNameById = async () => {
  return await InvenotryUnit.aggregate([
    {
      $lookup: {
        from: "invenotries",
        localField: "materialid",
        foreignField: "materialid",
        as: "inventory",
      },
    },
    { $unwind: "$inventory" },
  ]);
};
export const materialNameByIdByUnit = async (unitid: string) => {
  return await InvenotryUnit.aggregate([
    {
      $match: {
        unitid: unitid,
      },
    },
    {
      $lookup: {
        from: "invenotries",
        localField: "materialid",
        foreignField: "materialid",
        as: "inventory",
      },
    },
    { $unwind: "$inventory" },
  ]);
};
