require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/Auth/auth.routes");
const userRoutes = require("./routes/User/user.routes");
const categoryRoutes = require("./routes/Category/category.routes");
const productRoutes = require("./routes/Product/product.routes");

// DB CONNECTIONS
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => console.log("DB CONNECTED"))
    .catch(err => console.log(`err ${err.message}`));

// PORT
const PORT = process.env.PORT || 7000;

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes Prefix
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})