const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async errors");
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ products, nbHit: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$e",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split(`-`);

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

    console.log(filters);
  }

  console.log(queryObject);

  let result = Product.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // Select method
  if (fields) {
    const fieldsList = fields.split(",").join(" ");

    result = result.select(fieldsList);
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({
    data: products,
    nbHit: products.length,
    page,
    itemsPerPage: limit,
  });
};

module.exports = { getAllProducts, getAllProductsStatic };
