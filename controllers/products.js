const getAllProducts = (req, res) => {
  res.status(200).json({ success: true, msg: "on the way" });
};

module.exports = { getAllProducts };
