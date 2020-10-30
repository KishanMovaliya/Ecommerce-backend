const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(bodyparser.json());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  next();
});

//for set image publically
app.use("/uploads", express.static("uploads"));

//connect database
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;
con.on("open", () => {
  console.log("Database Connected...!");
});

//-----USER REGISTER-----
const registerRoute = require("./routes/registers");
app.use("/register", registerRoute);

//-----LOGIN USER-----
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

//-----get data after login-----
const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

//-----For Category-----
const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

//-----For Sub Category-----
const subcategoriesRoute = require("./routes/subcategories");
app.use("/subcategories", subcategoriesRoute);

//-----For Product-----
const productsRoute = require("./routes/products");
app.use("/products", productsRoute);

//-----For Add To Cart-----
const addtocartsRoute = require("./routes/addtocarts");
app.use("/addtocarts", addtocartsRoute);

//-----For Checkout Product-----
const productcheckoutRoute = require("./routes/productcheckouts");
app.use("/productcheckouts", productcheckoutRoute);

//-----order confirmed by admin----
const confirmedorderRoute = require("./routes/confirmedorders");
app.use("/confirmedorders", confirmedorderRoute);

//-----order moved from checkout to history----
const orderhistoriesRoute = require("./routes/orderhistories");
app.use("/orderhistories", orderhistoriesRoute);

app.listen(4444, () => {
  console.log(`Server Connected on PORT:4444...!`);
});
