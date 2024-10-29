import React, { useEffect, useState } from "react";

import {
  totalSales,
  topSellingProducts,
  SalesByPaymentType,
  lowStockProducts,
  topCustomer,
  topEmployee,
  profitMargin,
  getAllSaleInvoice,
} from "../apicalls/dashboard";
import AnnualSales from "../components/Dashboard/AnnualSales";
import TopProducts from "../components/Dashboard/TopProducts";

const Dashboard = () => {
  const [sales, setSales] = useState(0);
  const [salesByType, setSalesByType] = useState(0);
  const [lowStockAlerts, setLowStockAlerts] = useState(0);
  const [topCustomers, setTopCustomers] = useState(0);
  const [topEmployees, setTopEmployees] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [profitMgn, setProfitMgn] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const paymentType = "cash";

  const getTotalSales = async () => {
    try {
      const res = await totalSales();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setSales(res.data);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const getTopSellingProducts = async () => {
    try {
      const res = await topSellingProducts();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setTopProducts(res.data);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const getSalesByPaymentType = async () => {
    try {
      const res = await SalesByPaymentType(paymentType);

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setSalesByType(res.data);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const getLowStockProducts = async () => {
    try {
      const res = await lowStockProducts();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setLowStockAlerts(res.data.length);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const getTopCustomers = async () => {
    try {
      const res = await topCustomer();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setTopCustomers(res.data.length);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const getTopEmployee = async () => {
    try {
      const res = await topEmployee();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setTopEmployees(res.data.length);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };
  const getProfitMargin = async () => {
    try {
      const res = await profitMargin();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setProfitMgn(res.data);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const saleInvoices = async () => {
    try {
      const res = await getAllSaleInvoice();

      if (!res.data) {
        throw new Error(res.message);
      } else {
        setInvoices(res.data);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  useEffect(() => {
    getTotalSales();
    getTopSellingProducts();
    getSalesByPaymentType();
    getLowStockProducts();
    getTopCustomers();
    getTopEmployee();
    getProfitMargin();
    saleInvoices();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 mb-8">
        <div className="bg-teal-600 text-white font-medium px-5 py-7 rounded-md w-[300px]">
          <div className="flex items-center gap-1 justify-evenly">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            <div>
              <h2 className="text-xl">Total Sales</h2>
              <p>{sales} MMK</p>
            </div>
          </div>
        </div>
        <div className="bg-teal-600 text-white font-medium px-5 py-7 rounded-md w-[300px]">
          <div className="flex items-center justify-evenly gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12"
            >
              <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h1 className="text-xl">Sales by {paymentType}</h1>
              <p>{salesByType} MMK</p>
            </div>
          </div>
        </div>
        <div className="bg-teal-600 text-white font-medium px-5 py-7 rounded-md relative w-[300px]">
          <div className="flex items-center justify-evenly gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
              <path
                fillRule="evenodd"
                d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h1 className="text-xl">Low stock products</h1>
              {lowStockAlerts > 0 && (
                <>
                  <p className="bg-red-600 w-fit px-2 rounded-full absolute -top-2 -right-3">
                    {lowStockAlerts}
                  </p>
                  <p>{lowStockAlerts}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-teal-600 text-white font-medium px-5 py-7 rounded-md w-[300px]">
          <div className="flex items-center justify-evenly gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
            </svg>
            <div>
              <h1 className="text-xl">Top Customers</h1>
              <p>{topCustomers}</p>
            </div>
          </div>
        </div>
        <div className="bg-teal-600 text-white font-medium px-5 py-7 rounded-md w-[300px]">
          <div className="flex items-center justify-evenly gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10"
            >
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
            </svg>
            <div>
              <h1 className="text-xl">Top Employee</h1>
              <p>{topEmployees}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mx-auto gap-1 max-w-7xl">
        <AnnualSales invoices={invoices} />
        <TopProducts topProducts={topProducts} />
      </div>
    </>
  );
};

export default Dashboard;
