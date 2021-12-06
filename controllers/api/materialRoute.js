// importing express.router
const router = require("express").Router();
// importing models
const { Material, Product } = require("../../models");
const { sequelize } = require("../../models/User");

const withAuth = require("../../units/auth");

// GET of products
router.get("/", withAuth, async (req, res) => {

  const product_id = req.query.product_id;
  try {

    const materialData = await Material.findAll({
      where: {
        product_id: product_id,
      },
      include: [{ model: Product}],
    });

    const materials = materialData.map((material) =>
      material.get({ plain: true })
    );

    res.render("materials", {
      materials,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/type/:id", withAuth, async (req, res) => {
  try {
    const materialData = await Material.findAll();

    const materials = materialData.map((material) => {
      return material.get({ plain: true });
    });
    res.render("materials", {
      // remove the ... and it works
      materials,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET of products by id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const materialData = await Material.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          
        },
      ],
    });
    const material = materialData.get({ plain: true });

    res.render("materialInfo", {
      material,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// POST of products
router.post("/", withAuth, async (req, res) => {
  try {
    const newMaterial = Material.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMaterial);
  } catch (err) {
    res.status(400).status, json(err);
  }
});
//UPDATE of products
router.put("/:id", withAuth, (req, res) => {
  Material.update(req.body, { where: { id: req.params.id } })
    .then((materialData) => {
      if (!materialData[0]) {
        res
          .status(404)
          .json({ message: "No material Type found with this id!" });
        return;
      }
      res.json(materialData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// DELETE of products
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const materialData = await Material.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!materialData) {
      res.status(404).json({ message: "No material type exists with this ID" });
    }
    res.status(200).json(materialData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// export
module.exports = router;
