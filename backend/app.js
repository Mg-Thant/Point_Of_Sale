const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/database");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const staffRoutes = require("./routes/staff");
const saleInvoiceRoutes = require("./routes/saleInvoice");
const categoryRoutes = require("./routes/category");
const saleInvoiceDetailsRoutes = require("./routes/saleInvoiceDetails");
const inventoryRoutes = require("./routes/inventory");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/saleInvoice", saleInvoiceRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/saleInvoiceDetails", saleInvoiceDetailsRoutes);
app.use("/api/inventory", inventoryRoutes);

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running on port 3000");
});
