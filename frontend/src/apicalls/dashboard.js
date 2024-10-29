import { axiosInstance } from "./axiosInstance";

export const totalSales = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/totalSales");

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const topSellingProducts = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/topSellingProducts");

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const SalesByPaymentType = async (paymentType) => {
  try {
    const res = await axiosInstance.get(
      `/dashboard/salesByPaymentType/${paymentType}`
    );

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const lowStockProducts = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/lowStockProducts");

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const topCustomer = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/getTopCustomers");

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const topEmployee = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/getTopEmployee");

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const profitMargin = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/getProfitMargins");

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllSaleInvoice = async () => {
  try {
    const res = await axiosInstance.get("/invoice");

    return res.data;
  } catch (err) {
    return err.message;
  }
};
