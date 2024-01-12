const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async errors");
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHit: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (company) {
    queryObject.company = company;
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;

  res.status(200).json({ data: products, nbHit: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
