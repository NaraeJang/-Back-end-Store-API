const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async errors");
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHit: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (name) {
    queryObject.name = name;
  }

  if (company) {
    queryObject.company = company;
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHit: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
