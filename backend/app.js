const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/database");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const staffRoutes = require("./routes/staff");
const categoryRoutes = require("./routes/category");
const inventoryRoutes = require("./routes/inventory");
const invoiceRoutes = require("./routes/invoice");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoice", invoiceRoutes);

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running on port 3000");
});
