require("dotenv").config();

const express = require("express");
const app = express();
const products = require("./routes/products");
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// MIDDLEWARES
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>home page</h1><a href="/api/v1/products">check products</a>`);
});

// PRODUCT ROUTES
app.use("/api/v1/products", products);

// Error
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
