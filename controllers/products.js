const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, msg: "on the way" });
};

const getAllProductsStatic = (req, res) => {
  throw new Error("testing async errors");
  res.status(200).json({ success: true, msg: "Static" });
};

module.exports = { getAllProducts, getAllProductsStatic };
