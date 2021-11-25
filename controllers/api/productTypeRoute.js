// importing express.router
const router = require("express").Router();
// importing models
const { Product_Type, Product } = require("../../models");

// GET of products
router.get("/product_type", (req, res) => {
  try {
    const productTypeData = await Product_Type.findAll({
      include: [{ model: Product, atrributes: "name" }],
    });

    const productTypes = productTypeData.forEach((productType) => {
      productType.get({ plain: true });
    });
    res.render("homepage", {
      productTypes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET of products by id
router.get("/:id", (req, res) => {
  try {
    const productTypeData = await Product_Type.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          atrributes: "name",
        },
      ],
    });
    const productType = productTypeData.get({ plain: true });

    res.render("productType", {
      ...productType,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});
// POST of products
router.post("/", (req, res) => {
  try {
    const NewProductType = Product_Type.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(NewProductType);
  } catch (err) {
    res.status(400).status, json(err);
  }
});
//UPDATE of products
router.put("/:id", (req, res) => {
  Product_Type.update(req.body, { where: { id: req.params.id } })
    .then((productTypeData) => {
      if (!productTypeData[0]) {
        res
          .status(404)
          .json({ message: "No Product Type found with this id!" });
        return;
      }
      res.json(productTypeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// DELETE of products
router.delete("/:id", (req, res) => {
  try {
    const productTypeData = await Product_Type.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productTypeData) {
      res.status(404).json({ message: "No product type exists with this ID" });
    }
    res.status(200).json(productTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// export
