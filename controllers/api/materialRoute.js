// importing express.router
const router = require("express").Router();
// importing models
const { Material, Product } = require("../../models");

// GET of products
router.get("/", async (req, res) => {
  try {
    const materialData = await Material.findAll({
      include: [{ model: Product, atrributes: "name" }],
    });

    const materials = materialData.forEach((material) => {
      material.get({ plain: true });
    });
    res.render("homepage", {
      materials,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET of products by id
router.get("/:id", async (req, res) => {
  try {
    const materialData = await Material.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          atrributes: "name",
        },
      ],
    });
    const material = materialData.get({ plain: true });

    res.render("material", {
      ...material,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});
// POST of products
router.post("/", async (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
