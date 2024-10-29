import React from "react";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const AnnualSales = ({ invoices }) => {
  const currentDate = new Date();
  const lastYear = new Date();
  lastYear.setDate(currentDate.getDate() - 365);
  const productAnnualSellRate = {};

  invoices.forEach((invoice) => {
    const productSellDate = new Date(invoice.createdAt);
    if (productSellDate >= lastYear && productSellDate <= currentDate) {
      const formatDate = format(new Date(productSellDate), "dd/MM");
      if (!productAnnualSellRate[formatDate]) {
        productAnnualSellRate[formatDate] = 0;
      }
      productAnnualSellRate[formatDate] += 1;
    }
  });

  const chartData = Object.entries(productAnnualSellRate).map(
    ([key, value]) => {
      return {
        year: key,
        AnnualSellRate: value,
      };
    }
  );

  return (
      <ResponsiveContainer width="70%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="AnnualSellRate"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnnualSales;
