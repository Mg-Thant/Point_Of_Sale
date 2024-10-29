import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";

const TopProducts = ({ topProducts }) => {
  const formattedData = topProducts.map((product) => ({
    totalQuantity: product.totalQuantity,
    productName: product.productDetails[0]?.productName || "Unknown", // Safely access productName
  }));

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d08484",
    "#84d0d8",
    "#c184d8",
    "#6e9ef0",
    "#f06e6e",
    "#6566c9",
    "#7aed72",
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300} className="mx-auto w-full">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="totalQuantity"
            nameKey="productName"
            isAnimationActive={false}
            data={formattedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend mt-4">
        {formattedData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center mb-2">
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: 8,
              }}
            ></div>
            <span>{entry.productName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
