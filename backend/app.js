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
const dashboardRoutes = require("./routes/dashboard");
const isLogin = require("./middlewares/checkToken");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", isLogin, productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/shop", isLogin, shopRoutes);
app.use("/api/staff", isLogin, staffRoutes);
app.use("/api/category", isLogin, categoryRoutes);
app.use("/api/inventory", isLogin, inventoryRoutes);
app.use("/api/invoice", isLogin, invoiceRoutes);
app.use("/api/dashboard", isLogin, dashboardRoutes);

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running on port 3000");
});
