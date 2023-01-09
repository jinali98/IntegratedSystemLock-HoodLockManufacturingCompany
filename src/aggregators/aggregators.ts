import { Sale } from "../model/sale/sale";

export const salesByPeriod = async (from: Date, to: Date) => {
  return await Sale.aggregate([
    {
      $match: {
        periodStartDate: {
          $gte: from,
          $lte: to,
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productid",
        foreignField: "productid",
        as: "product",
      },
    },
    { $unwind: "$product" },
  ]);
};

export const salesByProductByPeriod = async (
  from: Date,
  to: Date,
  productid: string
) => {
  return await Sale.aggregate([
    {
      $match: {
        periodStartDate: {
          $gte: from,
          $lte: to,
        },
        productid,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productid",
        foreignField: "productid",
        as: "product",
      },
    },
    { $unwind: "$product" },
  ]);
};