import { Sale } from '../model/sale/sale';
import { Job } from '../model/job/job';

//Kavindra jobsCompletedByUnitByPeriod
export const jobsCompletedByUnitByPeriod = async (
  from: Date,
  to: Date,
  unitid: string
) => {
  return await Job.aggregate([
    {
      $match: {
        actualFinishDate: {
          $gte: from,
          $lte: to,
        },
        status: 'done',
        unitid,
      },
    },
    {
      $lookup: {
        from: 'employees',
        localField: 'empid',
        foreignField: 'empid',
        as: 'assigned-employee',
      },
    },
    { $unwind: '$assigned-employee' },
  ]);
};

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
        from: 'products',
        localField: 'productid',
        foreignField: 'productid',
        as: 'product',
      },
    },
    { $unwind: '$product' },
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
        from: 'products',
        localField: 'productid',
        foreignField: 'productid',
        as: 'product',
      },
    },
    { $unwind: '$product' },
  ]);
};
