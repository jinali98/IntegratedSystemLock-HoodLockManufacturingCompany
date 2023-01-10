import { Sale } from "../model/sale/sale";

export const totalIncomeAggregator = async (from: Date, to: Date) => {
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
      $addFields: {
        saleRecordIncome: { $multiply: ["$totalSoldQty", "$pricePerUnit"] },
      },
    },

    {
      $group: {
        _id: "",
        income: { $sum: "$saleRecordIncome" },
      },
    },
    {
      $project: {
        _id: 0,
        income: "$income",
        dateFrom: from,
        dateTo: to,
      },
    },
  ]);
};
export const salesIcomeAggregator = async (from: Date, to: Date) => {
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

    {
      $addFields: {
        saleRecordIncome: { $multiply: ["$totalSoldQty", "$pricePerUnit"] },
      },
    },
    {
      $project: {
        "product._id": 0,
        "product.__v": 0,
        "product.productid": 0,
        _id: 0,
        productid: 0,
        __v: 0,
      },
    },
  ]);
};
