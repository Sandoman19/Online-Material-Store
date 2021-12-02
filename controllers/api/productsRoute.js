// importing express.router
const router = require("express").Router();
// importing models
const { Product } = require("../../models");

// GET of products
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll();

    const products = productData.forEach((product) => {
      product.get({ plain: true });
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET of products by id
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);
    const product = productData.get({ plain: true });

    res.json(product);
  } catch (err) {
    res.status(404).json(err);
  }
});
// POST of products
router.post("/", (req, res) => {
  try {
    const NewProduct = Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(NewProduct);
  } catch (err) {
    res.status(400).status, json(err);
  }
});
//UPDATE of products
router.put("/:id", (req, res) => {
  Product.update(req.body, { where: { id: req.params.id } })
    .then((productData) => {
      if (!productData[0]) {
        res.status(404).json({ message: "No Product found with this id!" });
        return;
      }
      res.json(productData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// DELETE of products
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product exists with this ID" });
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// export
module.exports = router;
